import {ContentState, convertFromHTML, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';


export default class Wysiwyg {

    static parseInitialValue(htmlString) {
        const contentHTML = convertFromHTML(htmlString);
        const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
        return {
            state: state,
            raw: JSON.stringify(convertToRaw(state)),
            html: stateToHTML(state),
            inputValue: state.getBlocksAsArray().map(block => (!block.text.trim() && '\n') || block.text).join('\n')
        };
    }

    static getHtml(editorState) {
        const contentState = editorState.getCurrentContent();

        return contentState.hasText()
               ? stateToHTML(contentState)
               : null;
    }
}