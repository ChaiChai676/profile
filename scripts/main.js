/* Code blocks */

const codeContents = {
'qnn-example':
`

`,
'nr-2-1':
`
`,
'nr-2-2':
`
`,
'qnn-1-1':
`
`,
'qnn-1-2':
`
`,
'qnn-2':
`

`,
'qnn-3':
`
code code code
`,
'qnn-4':
`

`
    // ... add more snippets as needed
};

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.code-container').forEach(container => {
        let id = container.getAttribute('data-id');
        let codeContent = codeContents[id];

        if (codeContent) {
            container.querySelector('code').textContent = codeContent;
        } else {
            console.error(`No code content found for ID: ${id}`);
        }
    });
});

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        let codeContent = this.previousElementSibling.querySelector('code').textContent;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = codeContent;
        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        /*alert('Code copied to clipboard!');*/
    });
});

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        let codeContent = this.previousElementSibling.querySelector('code').textContent;

        let tempTextArea = document.createElement('textarea');
        tempTextArea.value = codeContent;
        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        // Change the button text
        this.textContent = 'Copied!';

        // Optionally, you can revert the button text back after a few seconds:
        setTimeout(() => {
            this.textContent = 'Copy';
        }, 2000); // Reverts back to 'Copy' after 2 seconds
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();
});
