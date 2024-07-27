from flask import Flask, request, jsonify
from tempfile import NamedTemporaryFile
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_cohere import CohereEmbeddings
from langchain_community.vectorstores import FAISS
from langchain import hub
from langchain_core.runnables import RunnablePassthrough
from langchain_cohere import ChatCohere
from langchain_core.output_parsers import StrOutputParser

app = Flask(__name__)

# Initialize LangChain components
cohere_api_key = "uml0lVi8lxTjTL10Bkb42inOlNFk3zDf7sELxPDN"  # Replace with your actual API key
llm = ChatCohere(cohere_api_key=cohere_api_key, model="command-r")
prompt = hub.pull("rlm/rag-prompt")

def save_and_process_document(file):
    with NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        file.save(temp_file.name)
        temp_file_path = temp_file.name

    loader = PyPDFLoader(temp_file_path)
    docs = loader.load()

    embeddings_model = CohereEmbeddings(cohere_api_key=cohere_api_key, model="embed-english-light-v3.0")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1100, chunk_overlap=150)
    splits = text_splitter.split_documents(docs)

    db = FAISS.from_documents(splits, embeddings_model)
    retriever = db.as_retriever(kwargs={"score_threshold": 0.5})

    return retriever

def chat(query, retriever):
    rag_chain = (
        {"context": retriever | (lambda docs: "\n\n".join(doc.page_content for doc in docs)), "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    return rag_chain.invoke(query)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    retriever = save_and_process_document(file)

    question = "What is this?"
    if not question:
        return jsonify({"error": "No question provided"}), 400

    response = chat(question, retriever)
    print(response)
    return jsonify({"message": "File processed successfully", "response": response})

if __name__ == '__main__':
    app.run(debug=True)
