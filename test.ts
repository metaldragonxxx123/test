export class Widget extends Loadable.Widget {
    // @ts-ignore _imageUri used in template
    private _imageUri: KnockoutDisposable;

    /**
     * Creates the widget.
     *
     * @param element The element to apply the widget to.
     * @param viewModel The view model to use, as a strongly typed ViewModel instance.
     * @param createOptions The creation options.
     */
    constructor(element: JQuery, viewModel: NoticeVM, createOptions?: Base.CreateOptions) {
        super(element, viewModel, createOptions);

        this.element
            .addClass(controlClass)
            .html(template);

        this._imageUri = ko.computed(this.ltm, () => {
            return imageUriMap[ko.unwrap(this.options.imageType)] || images.comingSoon;
        });

        this._bindDescendants();
    }
    
     private setAndResizeVideoPlayerContent = (videoPlayer: HTMLDivElement) => {
        if (videoPlayer) {
            videoPlayer.innerHTML = this.props.videoPlayerHtml;
            let iframes = videoPlayer.querySelectorAll('iframe');
            if (iframes && iframes.length === 1) {
                iframes[0].setAttribute('width', '800px');
                iframes[0].setAttribute('height', '530px');
            }
        }
    };

    /**
     * See parent.
     */
    public dispose(): void {
        this._cleanElement(controlClass);
        super.dispose();
    }

    /**
     * The view model driving this widget.
     *
     * @return ViewModel.
     */
    public get options(): NoticeVM {
        return <NoticeVM>this._options;
    }

    public _getTarget(uri: string): string {
        return (uri || "").startsWith("#") ? "" : "_blank";
    }
}
