from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from langchain_cohere.llms import Cohere



app = Flask(__name__)
CORS(app)

# Set your Cohere API key
llm = Cohere(cohere_api_key="uml0lVi8lxTjTL10Bkb42inOlNFk3zDf7sELxPDN")


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')

    # Call Cohere through LangChain to get a response
    try:
        bot_response=llm.invoke(user_message)
    except Exception as e:
        print(f"Error: {e}")
        bot_response = "Sorry, I encountered an error while processing your request."

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
