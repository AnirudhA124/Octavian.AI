from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Global variable to store responses
url_store = ""

@app.route('/process_url', methods=['POST'])
def process_url():
    global url_store
    data = request.get_json()
    url = data.get('url')
    print(f"Received URL: {url}")  # Debug output
    if url:
        # Simulate text extraction for testing
        extracted_text = url
        url_store += url  # Append text to the global variable
        return jsonify({'success': True, 'text': extracted_text})
    return jsonify({'success': False, 'text': ''}), 400

@app.route('/chat', methods=['POST'])
def chat():
    global url_store
    data = request.get_json()
    question = data.get('question')
    print(f"Received question: {question}")  # Debug output
    if question:
        # Process the question and generate a response
        response = "Answering for "+url_store+" where question is "+question # Use the global responses variable
        url_store=""
        print(f"Returning response: {response}")  # Debug output
        return jsonify({'answer': response})
    return jsonify({'error': 'No question provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
