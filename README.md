<div align="center">
  <img src="https://i.ibb.co/gDjsWyg/Logo-Image.png"><br>
</div>

-----------------

# Surfer: AI-Powered Website & Webpage Summarizer

![Python](https://img.shields.io/badge/python-3.12-blue)
![Status](https://img.shields.io/badge/status-stable-brightgreen)
![License](https://img.shields.io/badge/license-MIT-red)
![Together-AI](https://img.shields.io/badge/Together%20AI-0f6fff)
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
 - **Bring Your Own API Key**: No shared key needed. Add your own API key directly in the extension's settings panel — it's stored locally in your browser and never sent anywhere except the chosen AI provider.
 - **Multi-Provider Support**: Works with **Together AI**, **OpenAI**, **Groq**, and **Anthropic**. Pick the service you already have access to.
 - **Custom Model ID**: Override the default model for any provider with any model ID you prefer.
 - **Dark/Light Theme Toggle**: Switch between light and dark modes.
 - **Copy Summary**: Click on any generated summary to copy it to the clipboard.

## New in v1.1

- **Bring Your Own API Key** — no more shared `api_key.txt`. Each user provides their own key via the settings panel (⚙️).
- **Multi-provider LLM support** — Together AI, OpenAI, Groq, and Anthropic all work out of the box.
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
   > No `api_key.txt` needed anymore — the key is supplied by the extension at runtime.

#### 3. Load the extension in Chrome:
 - Go to **chrome://extensions/** in your browser.
 - Enable **Developer Mode** in the top-right corner.
 - Click **Load unpacked** and select the `Extension` directory.

#### 4. Add your API key:
 - Click the ⚙️ (gear) icon in the Surfer popup.
 - Select your **AI Service** (Together AI, OpenAI, Groq, or Anthropic).
 - Optionally enter a **Model ID** to override the default.
 - Paste your **API Key** and click **Save**.

Your key is stored only in your browser's local extension storage and sent only to the backend running on your own machine.

## Supported AI Services & Default Models

| Service     | Default Model                                    | Get an API Key |
|-------------|--------------------------------------------------|----------------|
| Together AI | `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`   | https://www.together.ai/ |
| OpenAI      | `gpt-4o-mini`                                    | https://platform.openai.com/ |
| Groq        | `llama3-8b-8192`                                 | https://console.groq.com/ |
| Anthropic   | `claude-3-haiku-20240307`                        | https://www.anthropic.com/ |

## Usage

Once installed and configured, Surfer summarizes websites and webpage content directly from your Chrome browser.

#### 1. Open the Surfer Extension:
 - Click on the Surfer icon in your Chrome toolbar.
#### 2. Select a Radio Button:
 - **Website Information**: Summarizes the website's core details.
 - **Webpage Content Summary**: Summarizes the visible content of the webpage you're on.
#### 3. Submit:
 - Click **Submit** to get the summary.

## Dependencies
 - [**Flask**: Backend server for handling summarization requests.](https://flask.palletsprojects.com/en/3.0.x/)
 - [**Together API**: Real-time AI API for generating summaries.](https://www.together.ai/)
 - [**BART Model**: Summarization model for content extraction.](https://huggingface.co/docs/transformers/en/model_doc/bart)
 - **OpenAI / Groq / Anthropic** Python SDKs (optional, install only the ones you need)

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

# Provide your API key
API_KEY = "YOUR_API_KEY"

surfer = Surfer(api_key=API_KEY)
```

## Contact

- `Email` - ggambhir1919@gmail.com
- `Instagram` - https://www.instagram.com/gautamxgambhir/
- `Twitter` - https://www.twitter.com/gautamxgambhir/
