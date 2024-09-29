<div align="center">

# WebLLM Chat

<a href="https://github.com/mlc-ai/web-llm"><img alt="Related Repository: WebLLM" src="https://img.shields.io/badge/Related_Repo-WebLLM-fafbfc?logo=github"></a>
<a href="https://chat.webllm.ai"><img alt="Web App Deployed on GitHub Pages" src="https://img.shields.io/badge/Web_App-Deployed-32a852?logo=pwa"></a>
<a href="https://discord.gg/9Xpy2HGBuD"><img alt="Join Discord" src="https://img.shields.io/badge/Join-Discord-7289DA?logo=discord&logoColor=white"></a>

**Private AI Conversations, Fully In-Browser.**

[**Chat Now**](https://chat.webllm.ai/)

[WebLLM Chat Demo Video](https://github.com/mlc-ai/web-llm-chat/assets/23090573/f700e27e-bb88-4068-bc8b-8a33ea5a4300)

</div>

## Overview

**WebLLM Chat** is a private AI chat interface that combines [WebLLM](https://github.com/mlc-ai/web-llm) with a user-friendly design, leveraging WebGPU to run large language models (LLMs) natively in your browser. Enjoy an unprecedented, private, and accessible AI conversation experience.

## Key Features

- **Browser-Native AI**: Experience cutting-edge language models running natively within your web browser with WebGPU acceleration, eliminating the need for server-side processing or cloud dependencies.
- **Ganranteed Privacy**: With the AI model running locally on your hardware and all data processing happening within your browser, your data and conversations never leave your computer, ensuring your privacy.
- **Offline Accessibility**: Run entirely offline after the initial setup and download, allowing you to engage with AI-powered conversations without an active internet connection.
- **Vision Model Support**: Chat with AI by uploading and sending images, making it easy to get insights and answers based on visual content.
- **User-Friendly Interface**: Enjoy the intuitive and feature-rich user interface, complete with markdown support, dark mode, and a responsive design optimized for various screen sizes.
- **Custom Models**: Connect to any custom language model on you local environment through [MLC-LLM](https://llm.mlc.ai/). For detail, check the [Use Custom Models](#use-custom-models) section.
- **Open Source and Customizable**: Build and customize your own AI-powered applications with our open-source framework.

WebLLM Chat is a pioneering initiative that combines the robust backend capabilities of WebLLM with the user-friendly interface of NextChat. As a part of the broader MLC.ai family, this project contributes to our mission of democratizing AI technology by making powerful tools accessible directly to end-users. By integrating with NextChat, WebLLM Chat not only enhances the chatting experience but also broadens the scope for deployment of self-hosted and customizable language models.

## Built-in Models

WebLLM Chat natively supports WebLLM build-in models. You can find the full list [here](https://github.com/mlc-ai/web-llm?tab=readme-ov-file#built-in-models).

## Use Custom Models

WebLLM Chat supports custom language models through [MLC-LLM](https://llm.mlc.ai/). Follow the following steps to use custom models on your local environment:

1. (Optional) Compile the model into MLC format by following [the instructions](https://llm.mlc.ai/docs/compilation/convert_weights.html).

2. Host REST API through MLC-LLM by following [the instructions](https://llm.mlc.ai/docs/deploy/rest.html).

3. Go to [WebLLM Chat](https://chat.webllm.ai/), select "Settings" in the side bar, then select "MLC-LLM REST API (Advanced)" as "Model Type" and type the REST API endpoint URL from step 2.

## Development

```shell
# 1. install nodejs and yarn first
# 2. config local env vars in `.env.local`
# 3. run
yarn install
yarn dev
```

## Deployment

### Build

You can build the application as a Next.js build using `yarn build` or as a static site using `yarn export`. For more information, check [Next.js documentation](https://nextjs.org/docs/pages/building-your-application/deploying);

### Docker

```shell
docker build -t webllm_chat .
docker run -d -p 3000:3000 webllm_chat
```

You can start service behind a proxy:

```shell
docker build -t webllm_chat .
docker run -d -p 3000:3000 \
   -e PROXY_URL=http://localhost:7890 \
   webllm_chat
```

If your proxy needs password, use:

```shell
-e PROXY_URL="http://127.0.0.1:7890 user pass"
```

## Community and Contributions

WebLLM Chat thrives on community involvement. We are committed to fostering an inclusive and innovative community where developers and AI enthusiasts can collaborate, contribute, and push the boundaries of what's possible in AI technology. Join us on Discord to connect with fellow developers and contribute to the project.

## Acknowledgements

WebLLM Chat is a companion project of [WebLLM](https://github.com/mlc-ai/web-llm/) and it is built upon the remarkable work of [NextChat](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web). We extend our sincere gratitude to the developers and contributors of these projects for their invaluable efforts in advancing the field of browser-based AI and creating user-friendly chat interfaces.

Further more, this project is only possible thanks to the shoulders of open-source ecosystems that we stand on. We want to thank the Apache TVM community and developers of the TVM Unity effort. The open-source ML community members made these models publicly available. PyTorch and Hugging Face communities make these models accessible. We would like to thank the teams behind Vicuna, SentencePiece, LLaMA, Alpaca. We also would like to thank the WebAssembly, Emscripten, and WebGPU communities. Finally, thanks to Dawn and WebGPU developers.
