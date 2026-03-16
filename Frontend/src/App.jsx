import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    setReview("### AI is analyzing your code... ⏳")
    try {
      const response = await axios.post('https://code-reviewer-1-sqe0.onrender.com/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      setReview("### ❌ Connection Error\nMake sure your backend is live on Render.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-wrapper">
      {/* Top Navigation */}
      <nav className="navbar">
        <div className="nav-logo">
          <div className="logo-box">AI</div>
          <span>CodeReviewer <small>v1.0</small></span>
        </div>
        <div className="nav-actions">
           <span className="status-dot"></span> System Live
        </div>
      </nav>

      <main className="container">
        {/* Left Side: Editor */}
        <section className="pane editor-pane">
          <div className="pane-header">Source Code</div>
          <div className="editor-content">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={20}
              className="code-editor"
            />
          </div>
          <button 
            disabled={loading}
            onClick={reviewCode} 
            className={`glow-button ${loading ? 'is-loading' : ''}`}>
            {loading ? "Analyzing..." : "Generate Review"}
          </button>
        </section>

        {/* Right Side: AI Feedback */}
        <section className="pane review-pane">
          <div className="pane-header">AI Insights</div>
          <div className="review-content">
            {review ? (
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            ) : (
              <div className="empty-state">
                <p>Paste your code and click generate to get professional feedback.</p>
              </div>
            )}
          </div>
        </section>
      </main>

{/* --- Professional Footer --- */}
<footer className="footer-professional">
  <div className="footer-left">
    &copy; 2026 CodeReviewer AI. Built with <span className="heart">❤️</span> by 
    <span className="author-name"> Akansha</span>
  </div>
  
  <div className="footer-right">
    <a 
      href="https://www.linkedin.com/in/akansha-b29a19254/" 
      target="_blank" 
      rel="noreferrer"
      className="footer-link"
    >
      LinkedIn
    </a>
    <a 
      href="https://github.com/Akansha1409" 
      target="_blank" 
      rel="noreferrer"
      className="footer-link"
    >
      GitHub
    </a>
    <div className="vertical-divider" />
    <span className="stack-badge">
      FULLSTACK AI (Llama 3.3)
    </span>
  </div>
</footer>
    </div>
  )
}

export default App
