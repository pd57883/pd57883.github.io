const STYLES: Record<string, string> = {
    "Styl 1": "style-1.css",
    "Styl 2": "style-2.css",
    "Styl 3": "style-3.css",
};

class StyleManager {
    private styles: Record<string, string>
    private currentStyleName: string;
    private currentStyleFile: string;
    private currentLinkElement: HTMLLinkElement | null = null;

    constructor(styles: Record<string, string>) {
        this.styles = styles;
        const firstStyleName = Object.keys(this.styles)[0];
        this.currentStyleName = firstStyleName;
        this.currentStyleFile = this.styles[firstStyleName];

        this.init();
    }
    
    init() {
        this.appendStyleToDOM(this.currentStyleFile);
        this.drawStyleLinks();
    }
    
    changeStyle(newStyleName: string) {
        if (this.currentStyleName === newStyleName) return;

        const newStyleFile = this.styles[newStyleName];

        if (this.currentLinkElement) {
            this.currentLinkElement.remove();
        }

        this.currentStyleName = newStyleName;
        this.currentStyleFile = newStyleFile;

        this.appendStyleToDOM(this.currentStyleFile);
    }

    private appendStyleToDOM(cssFileName: string) {
        const link: HTMLLinkElement = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `./${cssFileName}`;
        document.head.appendChild(link);
        this.currentLinkElement = link;
    }

    drawStyleLinks() {
        const container: HTMLDivElement = document.createElement('div');
        container.style.position = 'fixed';
        container.style.bottom = '10px';
        container.style.right = '10px';
        container.style.zIndex = '1000';
        container.style.backgroundColor = '#fff';
        container.style.border = '1px solid #ccc';
        container.style.borderRadius = '4px';
        container.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        container.style.padding = '10px';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '5px';

        const title = document.createElement('strong');
        title.innerText = "Wybierz styl";
        container.appendChild(title);

        for (const [styleName] of Object.entries(this.styles)) {
            const btn: HTMLButtonElement = document.createElement('button');
            btn.innerHTML = styleName;
            btn.addEventListener('click', () => {
                this.changeStyle(styleName);
            });
            container.appendChild(btn);
        }

        document.body.appendChild(container);
    }
}

new StyleManager(STYLES);