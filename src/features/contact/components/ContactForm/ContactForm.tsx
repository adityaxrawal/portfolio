import { useCallback, useEffect, useRef } from 'react';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaBold,
  FaChevronDown,
  FaEllipsisV,
  FaEraser,
  FaExpandAlt,
  FaFont,
  FaGoogleDrive,
  FaImage,
  FaIndent,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaLock,
  FaMinus,
  FaOutdent,
  FaPaperclip,
  FaPen,
  FaQuoteRight,
  FaRedo,
  FaRegSmile,
  FaStrikethrough,
  FaTimes,
  FaTrash,
  FaUnderline,
  FaUndo,
} from 'react-icons/fa';

import { links } from '@/config';
import { useContactFormState } from '../../hooks/useContactFormState';
import { useRichTextEditor } from '../../hooks/useRichTextEditor';
import type { ContactNotifyFn } from '../../types/contact.types';

import {
  actionLabels,
  fontOptions,
  LIMIT_WARNING_COOLDOWN,
  MESSAGE_LIMIT,
  panelMeta,
  sizeOptions,
  SUBJECT_LIMIT,
  textColors,
} from './contactFormConstants';
import { escapeHtml, getEditorText, normalizeUrl } from './contactFormUtils';
import './ContactForm.css';

interface ContactFormProps {
  onSubmit: (data: {
    recipient: string;
    subject: string;
    message: string;
    formattedMessage: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  onClose: () => void;
  notify?: ContactNotifyFn;
}

const ContactForm = ({
  onSubmit,
  isSubmitting,
  onClose,
  notify,
}: ContactFormProps) => {
  const insertInputRef = useRef<HTMLInputElement>(null);
  const insertTextInputRef = useRef<HTMLInputElement>(null);
  const warningTimesRef = useRef<Record<string, number>>({});

  const {
    subject,
    setSubject,
    setMessageLength,
    isToolbarVisible,
    setIsToolbarVisible,
    insertPanel,
    setInsertPanel,
    insertTextValue,
    setInsertTextValue,
    insertValue,
    setInsertValue,
    selectedLinkText,
    setSelectedLinkText,
    messageRemaining,
    canSend,
  } = useContactFormState(isSubmitting);

  const {
    editorRef,
    savedRangeRef,
    syncMessageState,
    getMessageSelection,
    saveEditorSelection,
  } = useRichTextEditor(setMessageLength);

  const activePanelMeta = insertPanel
    ? panelMeta[insertPanel as keyof typeof panelMeta]
    : null;
  const hasSelectedLinkText = selectedLinkText.trim().length > 0;

  useEffect(() => {
    if (insertPanel) {
      if (hasSelectedLinkText) {
        insertInputRef.current?.focus();
      } else {
        insertTextInputRef.current?.focus();
      }
    }
  }, [hasSelectedLinkText, insertPanel]);

  const showLimitedWarning = useCallback(
    (key: string, message: string) => {
      const now = Date.now();

      if (now - (warningTimesRef.current[key] || 0) < LIMIT_WARNING_COOLDOWN) {
        return;
      }

      warningTimesRef.current[key] = now;
      notify?.(message, 'warning');
    },
    [notify],
  );

  const clearInsertPanel = useCallback(() => {
    setInsertPanel(null);
    setInsertValue('');
    setInsertTextValue('');
    setSelectedLinkText('');
  }, []);

  const restoreEditorSelection = useCallback(() => {
    if (!savedRangeRef.current) {
      editorRef.current?.focus();
      return;
    }

    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(savedRangeRef.current!);
  }, []);

  const runEditorCommand = useCallback(
    (command: string, value: string | null = null) => {
      restoreEditorSelection();
      editorRef.current?.focus();
      document.execCommand(command, false, value ?? undefined);
      syncMessageState();
    },
    [restoreEditorSelection, syncMessageState],
  );

  const insertText = useCallback(
    (text: string) => {
      editorRef.current?.focus();
      document.execCommand('insertText', false, text);
      syncMessageState();
    },
    [syncMessageState],
  );

  const handleUnavailableAction = useCallback(
    (action: keyof typeof actionLabels) => {
      notify?.(actionLabels[action], 'info');
    },
    [notify],
  );

  const handleSubjectBeforeInput = useCallback(
    (event: InputEvent) => {
      if (!event.data || subject.length + event.data.length <= SUBJECT_LIMIT) {
        return;
      }

      event.preventDefault();
      showLimitedWarning(
        'subject-limit',
        `Subject can be up to ${SUBJECT_LIMIT} characters.`,
      );
    },
    [showLimitedWarning, subject.length],
  );

  const handleSubjectChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextSubject = event.target.value.slice(0, SUBJECT_LIMIT);

      setSubject(nextSubject);

      if (nextSubject.length === SUBJECT_LIMIT) {
        showLimitedWarning(
          'subject-limit',
          `Subject can be up to ${SUBJECT_LIMIT} characters.`,
        );
      }
    },
    [showLimitedWarning],
  );

  const handleEditorBeforeInput = useCallback(
    (event: InputEvent) => {
      if (
        event.inputType?.startsWith('delete') ||
        event.inputType?.startsWith('history') ||
        event.inputType === 'formatBold' ||
        event.inputType === 'formatItalic' ||
        event.inputType === 'formatUnderline'
      ) {
        return;
      }

      const currentLength = getEditorText(editorRef.current).length;
      const incomingText =
        event.data ?? (event.inputType === 'insertParagraph' ? '\n' : '');
      const remaining = MESSAGE_LIMIT - currentLength;

      if (remaining <= 0) {
        event.preventDefault();
        showLimitedWarning(
          'message-limit',
          `Message can be up to ${MESSAGE_LIMIT} characters.`,
        );
        return;
      }

      if (incomingText.length > remaining) {
        event.preventDefault();
        insertText(incomingText.slice(0, remaining));
        showLimitedWarning(
          'message-limit',
          `Message can be up to ${MESSAGE_LIMIT} characters.`,
        );
      }
    },
    [insertText, showLimitedWarning],
  );

  const handleEditorInput = useCallback(() => {
    const length = getEditorText(editorRef.current).length;

    if (length >= MESSAGE_LIMIT) {
      showLimitedWarning(
        'message-limit',
        `Message can be up to ${MESSAGE_LIMIT} characters.`,
      );
    }

    setMessageLength(Math.min(length, MESSAGE_LIMIT));
  }, [showLimitedWarning]);

  const handleEditorPaste = useCallback(
    (event: React.ClipboardEvent) => {
      event.preventDefault();

      const pastedText = event.clipboardData.getData('text/plain');
      const currentLength = getEditorText(editorRef.current).length;
      const remaining = MESSAGE_LIMIT - currentLength;

      if (remaining <= 0) {
        showLimitedWarning(
          'message-limit',
          `Message can be up to ${MESSAGE_LIMIT} characters.`,
        );
        return;
      }

      insertText(pastedText.slice(0, remaining));

      if (pastedText.length > remaining) {
        showLimitedWarning(
          'message-limit',
          `Message can be up to ${MESSAGE_LIMIT} characters.`,
        );
      }
    },
    [insertText, showLimitedWarning],
  );

  const handleOpenInsertPanel = useCallback(
    (panel: string) => {
      const messageSelection = getMessageSelection();
      const selectedText = messageSelection?.text.trim() || '';

      savedRangeRef.current = messageSelection?.range || null;
      setInsertValue('');
      setInsertTextValue('');
      setSelectedLinkText(selectedText);
      setInsertPanel((currentPanel) => (currentPanel === panel ? null : panel));
    },
    [getMessageSelection],
  );

  const handleInsertPanelSubmit = useCallback(
    (event?: React.SyntheticEvent) => {
      event?.preventDefault();

      const url = normalizeUrl(insertValue);
      const displayText = (selectedLinkText || insertTextValue).trim();

      if (!url) {
        notify?.('Paste a valid link first.', 'warning');
        return;
      }

      if (!displayText) {
        notify?.('Add the text to display for this link.', 'warning');
        return;
      }

      restoreEditorSelection();

      if (selectedLinkText) {
        runEditorCommand('createLink', url);
      } else {
        const currentLength = getEditorText(editorRef.current).length;
        const remaining = MESSAGE_LIMIT - currentLength;

        if (remaining <= 0) {
          showLimitedWarning(
            'message-limit',
            `Message can be up to ${MESSAGE_LIMIT} characters.`,
          );
          return;
        }

        const safeDisplayText = displayText.slice(0, remaining);

        if (safeDisplayText.length < displayText.length) {
          showLimitedWarning(
            'message-limit',
            `Message can be up to ${MESSAGE_LIMIT} characters.`,
          );
        }

        runEditorCommand(
          'insertHTML',
          `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
            safeDisplayText,
          )}</a>`,
        );
      }

      clearInsertPanel();
      syncMessageState();
    },
    [
      clearInsertPanel,
      insertTextValue,
      insertValue,
      notify,
      restoreEditorSelection,
      runEditorCommand,
      selectedLinkText,
      showLimitedWarning,
      syncMessageState,
    ],
  );

  const handleCloseInsertPanel = useCallback(() => {
    clearInsertPanel();
    editorRef.current?.focus();
  }, [clearInsertPanel]);

  const handleToolbarMouseDown = useCallback((event: React.MouseEvent) => {
    const target = event.target as Element;
    if (target.closest('select') || target.closest('input')) {
      return;
    }

    event.preventDefault();
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const trimmedSubject = subject.trim();
      const messageText = getEditorText(editorRef.current).trim();

      if (!trimmedSubject) {
        notify?.('Add a subject before sending.', 'warning');
        return;
      }

      if (!messageText) {
        notify?.('Write a message before sending.', 'warning');
        return;
      }

      await onSubmit({
        recipient: links.email,
        subject: trimmedSubject,
        message: messageText,
        formattedMessage: editorRef.current?.innerHTML || messageText,
      });
    },
    [notify, onSubmit, subject],
  );

  return (
    <form className="gmail-compose" onSubmit={handleSubmit}>
      <div className="gmail-compose__header">
        <span>New Message</span>
        <div className="gmail-compose__window-actions">
          <button type="button" aria-label="Minimize compose window">
            <FaMinus />
          </button>
          <button type="button" aria-label="Expand compose window">
            <FaExpandAlt />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close compose window"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="gmail-compose__field gmail-compose__field--recipient">
        <span>To</span>
        <input value={links.email} disabled aria-label="Recipient email" />
      </div>

      <div className="gmail-compose__field">
        <input
          value={subject}
          onBeforeInput={
            handleSubjectBeforeInput as unknown as React.FormEventHandler<HTMLInputElement>
          }
          onChange={handleSubjectChange}
          maxLength={SUBJECT_LIMIT}
          placeholder="Subject"
          aria-label="Subject"
        />
      </div>

      <div
        ref={editorRef}
        className="gmail-compose__editor"
        contentEditable
        data-placeholder="Write your message"
        onBeforeInput={
          handleEditorBeforeInput as unknown as React.FormEventHandler<HTMLDivElement>
        }
        onInput={handleEditorInput}
        onKeyUp={saveEditorSelection}
        onMouseUp={saveEditorSelection}
        onPaste={handleEditorPaste}
        role="textbox"
        aria-label="Message"
        aria-multiline="true"
        tabIndex={0}
        suppressContentEditableWarning
      />

      <div className="gmail-compose__counter" aria-live="polite">
        {messageRemaining} characters left
      </div>

      {isToolbarVisible && (
        <div
          className="gmail-compose__format-toolbar"
          aria-label="Formatting toolbar"
          onMouseDown={handleToolbarMouseDown}
          role="toolbar"
        >
          <button
            type="button"
            onClick={() => runEditorCommand('undo')}
            aria-label="Undo"
          >
            <FaUndo />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('redo')}
            aria-label="Redo"
          >
            <FaRedo />
          </button>
          <span className="gmail-compose__toolbar-divider" />
          <label className="gmail-compose__select">
            <select
              defaultValue={fontOptions[0].value}
              onChange={(event) =>
                runEditorCommand('fontName', event.target.value)
              }
              aria-label="Font family"
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
            <FaChevronDown />
          </label>
          <label className="gmail-compose__select gmail-compose__select--compact">
            <select
              defaultValue={sizeOptions[0].value}
              onChange={(event) =>
                runEditorCommand('formatBlock', event.target.value)
              }
              aria-label="Text size"
            >
              {sizeOptions.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <FaChevronDown />
          </label>
          <span className="gmail-compose__toolbar-divider" />
          <button
            type="button"
            onClick={() => runEditorCommand('bold')}
            aria-label="Bold"
          >
            <FaBold />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('italic')}
            aria-label="Italic"
          >
            <FaItalic />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('underline')}
            aria-label="Underline"
          >
            <FaUnderline />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('strikeThrough')}
            aria-label="Strikethrough"
          >
            <FaStrikethrough />
          </button>
          <div className="gmail-compose__color-group" aria-label="Text color">
            <FaFont />
            {textColors.map((color) => (
              <button
                key={color}
                type="button"
                className="gmail-compose__swatch"
                style={{ '--compose-swatch': color } as React.CSSProperties}
                onClick={() => runEditorCommand('foreColor', color)}
                aria-label={`Use color ${color}`}
              />
            ))}
          </div>
          <span className="gmail-compose__toolbar-divider" />
          <button
            type="button"
            onClick={() => runEditorCommand('justifyLeft')}
            aria-label="Align left"
          >
            <FaAlignLeft />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('justifyCenter')}
            aria-label="Align center"
          >
            <FaAlignCenter />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('insertOrderedList')}
            aria-label="Numbered list"
          >
            <FaListOl />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('insertUnorderedList')}
            aria-label="Bulleted list"
          >
            <FaListUl />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('outdent')}
            aria-label="Decrease indent"
          >
            <FaOutdent />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('indent')}
            aria-label="Increase indent"
          >
            <FaIndent />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('formatBlock', 'blockquote')}
            aria-label="Quote"
          >
            <FaQuoteRight />
          </button>
          <button
            type="button"
            onClick={() => runEditorCommand('removeFormat')}
            aria-label="Remove formatting"
          >
            <FaEraser />
          </button>
        </div>
      )}

      {insertPanel && (
        <div className="gmail-compose__insert-panel">
          <div className="gmail-compose__insert-panel-inner">
            <div className="gmail-compose__insert-panel-copy">
              <span>{activePanelMeta?.title}</span>
              <small>
                {hasSelectedLinkText
                  ? `Selected text: "${selectedLinkText}"`
                  : 'Add display text and a URL. This only inserts into the message.'}
              </small>
            </div>
            {!hasSelectedLinkText && (
              <label className="gmail-compose__insert-field">
                <span>Text to display</span>
                <input
                  ref={insertTextInputRef}
                  value={insertTextValue}
                  onChange={(event) => setInsertTextValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleInsertPanelSubmit(event);
                    }
                  }}
                  placeholder="Text shown in the message"
                />
              </label>
            )}
            <label className="gmail-compose__insert-field">
              <span>{activePanelMeta?.urlLabel}</span>
              <input
                ref={insertInputRef}
                value={insertValue}
                onChange={(event) => setInsertValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleInsertPanelSubmit(event);
                  }
                }}
                placeholder={activePanelMeta?.urlPlaceholder}
              />
            </label>
            <div className="gmail-compose__insert-actions">
              <button type="button" onClick={handleInsertPanelSubmit}>
                Apply
              </button>
              <button
                type="button"
                onClick={handleCloseInsertPanel}
                aria-label="Close insert panel"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="gmail-compose__actions">
        <div className="gmail-compose__send-group">
          <button
            type="submit"
            className="gmail-compose__send"
            disabled={!canSend}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
          <button
            type="button"
            className="gmail-compose__send-more"
            aria-label="More send options"
          >
            <FaChevronDown />
          </button>
        </div>

        <button
          type="button"
          className={isToolbarVisible ? 'is-active' : ''}
          onClick={() => setIsToolbarVisible((visible) => !visible)}
          aria-label="Toggle formatting options"
        >
          <span>Aa</span>
        </button>
        <button
          type="button"
          onClick={() => handleUnavailableAction('attach')}
          aria-label="Attach files"
        >
          <FaPaperclip />
        </button>
        <button
          type="button"
          onClick={() => handleOpenInsertPanel('link')}
          aria-label="Insert link"
        >
          <FaLink />
        </button>
        <button
          type="button"
          onClick={() => insertText(' :-)')}
          aria-label="Insert emoji"
        >
          <FaRegSmile />
        </button>
        <button
          type="button"
          onClick={() => handleUnavailableAction('drive')}
          aria-label="Insert from Drive"
        >
          <FaGoogleDrive />
        </button>
        <button
          type="button"
          onClick={() => handleOpenInsertPanel('image')}
          aria-label="Insert image"
        >
          <FaImage />
        </button>
        <button
          type="button"
          onClick={() => handleUnavailableAction('confidential')}
          aria-label="Confidential mode"
        >
          <FaLock />
        </button>
        <button
          type="button"
          onClick={() => handleUnavailableAction('pen')}
          aria-label="Insert signature"
        >
          <FaPen />
        </button>
        <button
          type="button"
          onClick={() => handleUnavailableAction('more')}
          aria-label="More options"
        >
          <FaEllipsisV />
        </button>
        <button
          type="button"
          className="gmail-compose__discard"
          onClick={onClose}
          aria-label="Discard draft"
        >
          <FaTrash />
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
