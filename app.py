from flask import Flask, request, jsonify
from flask_cors import CORS
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from transformers import BartForConditionalGeneration, BartTokenizer

app = Flask(__name__)
CORS(app)

# Load BART model and tokenizer for webpage content summarization
model_name = "facebook/bart-large-cnn"
tokenizer = BartTokenizer.from_pretrained(model_name)
model = BartForConditionalGeneration.from_pretrained(model_name)

def summarize_text(text):
    inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs["input_ids"], max_length=150, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def extract_text_from_webpage(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'html.parser')
    paragraphs = soup.find_all(['p', 'h1', 'h2', 'h3'])
    text_content = ' '.join([para.get_text() for para in paragraphs])
    return text_content

def get_together_client(api_key):
    """Create a Together AI client with the provided API key."""
    import together
    return together.Together(api_key=api_key)

def call_llm(api_key, service, model_id, prompt):
    """
    Route the LLM call to the correct provider based on the service name.
    Supported services: together, openai, groq, anthropic
    """
    service = (service or "together").lower()

    if service == "together":
        import together
        client = together.Together(api_key=api_key)
        completion = client.chat.completions.create(
            model=model_id or "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        return completion.choices[0].message.content.strip()

    elif service == "openai":
        from openai import OpenAI
        client = OpenAI(api_key=api_key)
        completion = client.chat.completions.create(
            model=model_id or "gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return completion.choices[0].message.content.strip()

    elif service == "groq":
        from groq import Groq
        client = Groq(api_key=api_key)
        completion = client.chat.completions.create(
            model=model_id or "llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}]
        )
        return completion.choices[0].message.content.strip()

    elif service == "anthropic":
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)
        message = client.messages.create(
            model=model_id or "claude-3-haiku-20240307",
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text.strip()

    else:
        raise ValueError(f"Unsupported service: '{service}'. Choose from: together, openai, groq, anthropic")

@app.route("/website_info", methods=["POST"])
def website_info():
    data = request.get_json()
    url = data.get("url")
    api_key = data.get("api_key", "").strip()
    service = data.get("service", "together")
    model_id = data.get("model_id", "")

    if not url:
        return jsonify({'error': 'URL not provided'}), 400

    if not api_key:
        return jsonify({'error': 'API key not provided. Please add your API key in the extension settings.'}), 400

    try:
        parsed_url = urlparse(url)
        domain_parts = parsed_url.netloc.split('.')

        if 'www' in domain_parts:
            domain_parts.remove('www')

        if len(domain_parts) >= 2:
            website_name = domain_parts[-2].title()
            formatted_website_name = website_name.replace('-', ' ').title()
            prompt = f"Provide a 2-line summary of the website {formatted_website_name}."
            summary_text = call_llm(api_key, service, model_id, prompt)
            summary_text = summary_text.replace('\n', '').strip()
            return jsonify({'summary': summary_text})
        else:
            return jsonify({"error": "Invalid domain"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/summarize_webpage", methods=["POST"])
def summarize_webpage():
    data = request.get_json()
    url = data.get("url")
    # api_key not required for local BART summarization, but accepted for future use
    # api_key = data.get("api_key", "").strip()

    if not url:
        return jsonify({'error': 'URL not provided'}), 400

    try:
        webpage_text = extract_text_from_webpage(url)
        if not webpage_text.strip():
            return jsonify({'error': 'No content found on the webpage.'}), 400

        summary = summarize_text(webpage_text)
        return jsonify({'summary': summary})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
