import React, { Component, PropTypes } from 'react';
import marked from 'marked';

const propTypes = {
    source: React.PropTypes.string.isRequired
};

const defaultProps = {
    source: ''
};

class Markdown extends Component {
    constructor(props) {
        super(props);

        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
    }

    render() {
        const { source } = this.props,
        html = marked(source || '');

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: html}} />
            </div>
        );
    }
}

Markdown.propTypes = propTypes;
Markdown.defaultProps = defaultProps;

export default Markdown;