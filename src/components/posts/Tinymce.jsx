import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const Tinymce = ({ editorRef, initialValue, setContent }) => {
  return (
    <>
      <Editor
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          license_key: 'gpl',
        }}
        onEditorChange={(value) => setContent(value)}
      />
    </>
  )
}

export default Tinymce
