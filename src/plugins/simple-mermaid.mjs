import { visit } from 'unist-util-visit';

export function simpleMermaid() {
    return (tree) => {
        visit(tree, 'code', (node) => {
            if (node.lang === 'mermaid') {
                node.type = 'html';
                // Wrap in a div with "mermaid" class. 
                // IMPORTANT: We do NOT encode/decode here. We act as a passthrough.
                // The client-side script will pick up the text content.
                node.value = `<div class="mermaid">${node.value}</div>`;
            }
        });
    };
}
