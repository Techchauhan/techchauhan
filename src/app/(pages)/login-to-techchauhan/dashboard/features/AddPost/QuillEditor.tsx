import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import Quill from 'quill';

// Register the image resize module
Quill.register('modules/imageResize', ImageResize);

const QuillEditor = ({ content, onChange }: { content: string; onChange: (value: string) => void }) => {
  return (
    <ReactQuill
      value={content}
      onChange={onChange}
      modules={QuillEditor.modules}
      formats={QuillEditor.formats}
      placeholder="Write something amazing..."
      className="mb-4 text-black"
    />
  );
};

QuillEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['code-block'],
    [{ 'align': [] }],
    ['clean'] // removes formatting
  ],
  imageResize: {}, // Include the image resize module
};

QuillEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'video',
  'code-block', 'align'
];

export default QuillEditor;
