<div align="center">
  <img src="https://i.ibb.co/gDjsWyg/Logo-Image.png"><br>
</div>

-----------------

# Surfer: AI-Powered Website & Webpage Summarizer

![Python](https://img.shields.io/badge/python-3.12-blue)
![Status](https://img.shields.io/badge/status-stable-brightgreen)
![License](https://img.shields.io/badge/license-MIT-red)
![BART](https://img.shields.io/badge/BART-8A2BE2)

## What is it?

Surfer is an AI-powered Chrome extension designed to make web browsing faster and smarter by summarizing both website overviews and webpage content.
Whether you're doing in-depth research or just exploring a new site,
Surfer delivers concise summaries tailored to your needs.
With Surfer, you can:
 - Get brief website summaries with just two lines of information.
 - Generate detailed webpage content summaries from articles, blogs, and more.

## Main Features

 - **Website Information Summarization**: Receive a 2-line overview of any website for a quick glance at its purpose and content.
 - **Webpage Content Summarization**: Get comprehensive summaries of webpage content in a concise format.
 - **Bring Your Own API Key**: Surfer does not include or require any shared API key. You bring your own key from whichever AI provider you use, enter it in the extension settings, and you're good to go.
 - **Multi-Provider Support**: Works with **Together AI**, **OpenAI**, **Groq**, **Anthropic**, and **Google Gemini**. Pick the service you already have access to.
 - **Custom Model ID**: Override the default model for any provider with any model ID you prefer.
 - **Dark/Light Theme Toggle**: Switch between light and dark modes.
 - **Copy Summary**: Click on any generated summary to copy it to the clipboard.

## New in v1.1

- **Bring Your Own API Key** — Surfer no longer ships with or depends on any API key. Each user adds their own key via the settings panel (⚙️). The key is stored only in your browser's local storage.
- **Multi-provider LLM support** — Together AI, OpenAI, Groq, Anthropic, and Google Gemini all work out of the box.
- **Custom model IDs** — override the default model per provider.

## Where to get it?

The extension is hosted on GitHub at: https://github.com/gautamxgambhir/surferr

## Installation and Setup

#### 1. Clone the repository:
```
git clone https://github.com/gautamxgambhir/Surferr.git
```

#### 2. Backend setup (Make sure `app.py` is running):
 - Navigate to the project directory.
 - Install the required Python dependencies:
    ```
    pip install -r requirements.txt
    ```
 - Start the Flask server:
    ```
    python app.py
    ```

#### 3. Load the extension in Chrome:
 - Go to **chrome://extensions/** in your browser.
 - Enable **Developer Mode** in the top-right corner.
 - Click **Load unpacked** and select the `Extension` directory.

#### 4. Add your API key:
 - Click the ⚙️ (gear) icon in the Surfer popup.
 - Select your **AI Service** (Together AI, OpenAI, Groq, or Anthropic).
 - Optionally enter a **Model ID** to override the default for that service.
 - Paste your **API Key** and click **Save**.

> Your key is stored only in your browser's local extension storage. It is sent exclusively to the Flask backend running on your own machine — never to any third party directly from the extension.

## Supported AI Services & Default Models

You need an API key from **one** of the following providers:

| Service     | Default Model                                    | Get an API Key |
|-------------|--------------------------------------------------|----------------|
| Together AI | `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`   | https://www.together.ai/ |
| OpenAI      | `gpt-4o-mini`                                    | https://platform.openai.com/ |
| Groq        | `llama3-8b-8192`                                 | https://console.groq.com/ |
| Anthropic   | `claude-3-haiku-20240307`                        | https://www.anthropic.com/ |
| Google Gemini | `gemini-1.5-flash`                             | https://aistudio.google.com/app/apikey |

Install only the SDK(s) you need. By default `requirements.txt` includes Together AI. Uncomment the relevant line(s) for other providers.

## Usage

Once installed and configured, Surfer summarizes websites and webpage content directly from your Chrome browser.

#### 1. Open the Surfer Extension:
 - Click on the Surfer icon in your Chrome toolbar.
#### 2. Select a Radio Button:
 - **Website Information**: Summarizes the website's core details using your chosen LLM.
 - **Webpage Content Summary**: Summarizes the visible content of the webpage you're on using the local BART model (no API key required for this).
#### 3. Submit:
 - Click **Submit** to get the summary.

## Dependencies
 - [**Flask**: Backend server for handling summarization requests.](https://flask.palletsprojects.com/en/3.0.x/)
 - [**BART Model**: Local summarization model for webpage content extraction.](https://huggingface.co/docs/transformers/en/model_doc/bart)
 - **Your AI provider's Python SDK** — Together AI, OpenAI, Groq, Anthropic, or Google Gemini (install only the one you use).

## Package

#### Links
 - [PyPi](https://pypi.org/project/surferr/0.3/)
 - [Source code](https://github.com/gautamxgambhir/surferr)

#### Package Installation
    pip install surferr

### Upgrade
    pip install surferr --upgrade

#### Package Features
 - Summarize any text
 - Extract text from a webpage
 - Summarize a webpage from a URL
 - Get website information summary

##### Setup of Package

```python
from surferr import Surfer, version

# Provide your own API key
API_KEY = "YOUR_API_KEY"

surfer = Surfer(api_key=API_KEY)
```

## Contact

- `Email` - ggambhir1919@gmail.com
- `Instagram` - https://www.instagram.com/gautamxgambhir/
- `Twitter` - https://www.twitter.com/gautamxgambhir/
