import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      setReview("⚠️ Error fetching review. Please check your server.");
    }
  }

  return (
    <main>
      {/* Left: Code Editor */}
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={14}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 15,
              color: "#e2e8f0",
              height: "100%",
              width: "100%",
              background: "rgba(17, 25, 40, 0.9)",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>

        {/* Review Button */}
        <button className="review-btn" onClick={reviewCode}>
          🚀 Review Code
        </button>
      </div>

      {/* Right: AI Review */}
      <div className="right">
        <h2 className="review-heading">AI Review</h2>
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
