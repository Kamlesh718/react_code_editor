# 📦 React Code Editor

An **in-browser React + JavaScript code editor** built with **Monaco Editor**, **Babel**, and **iframe live preview**.  
Supports **dark/light theme toggle**, **error handling**, and a simple **terminal** for `console.log`, `console.warn`, and `console.error` 🚀

**Live Site** - https://react-code-editor-rust.vercel.app/

---

## ✨ Features

- 🎨 **Monaco Editor** (the same editor used by VSCode)
- ⚛️ **Write and run React code live**
- 🌗 **Dark / Light mode toggle**
- 🖥️ **Live Preview** with iframe sandbox
- 🐞 **Syntax error** and **runtime error** display
- 🖥️ **Terminal** to capture `console.log`, `console.warn`, and `console.error` outputs

---

## Screenshot

![image](https://github.com/user-attachments/assets/e1ae7d68-7298-4d36-9cae-31b5d3912982)


## 📁 Project Structure

```bash
components/
├── CodeEditorArea.jsx   # Renders the Monaco Editor
├── Preview.jsx          # Compiles and runs the code inside an iframe
├── ThemeToggle.jsx      # Dark/Light mode switch button
├── ErrorDisplay.jsx     # Displays syntax errors
├── Terminal.jsx         # Shows logs from the iframe console
Editor/
├── CodeEditor.jsx      # Main component to integrate editor and preview
