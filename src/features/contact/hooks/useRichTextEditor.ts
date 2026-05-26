import { useCallback, useRef } from 'react';

import { getEditorText } from '../components/ContactForm/contactFormUtils';

export function useRichTextEditor(setMessageLength: (length: number) => void) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const syncMessageState = useCallback(() => {
    setMessageLength(getEditorText(editorRef.current).length);
  }, [setMessageLength]);

  const getMessageSelection = useCallback(() => {
    const selection = window.getSelection();

    if (
      !selection?.rangeCount ||
      !editorRef.current?.contains(selection.anchorNode) ||
      !editorRef.current?.contains(selection.focusNode)
    ) {
      return null;
    }

    return {
      range: selection.getRangeAt(0).cloneRange(),
      text: selection.toString(),
    };
  }, []);

  const saveEditorSelection = useCallback(() => {
    const messageSelection = getMessageSelection();

    if (!messageSelection) {
      return;
    }

    savedRangeRef.current = messageSelection.range;
  }, [getMessageSelection]);

  return {
    editorRef,
    savedRangeRef,
    syncMessageState,
    getMessageSelection,
    saveEditorSelection,
  };
}
