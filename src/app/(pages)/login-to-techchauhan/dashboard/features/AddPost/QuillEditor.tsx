import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import Quill from 'quill';

// Register the image resize module
Quill.register('modules/imageResize', ImageResize);

const QuillEditor = ({ content, onChange }: { content: string; onChange: (value: string) => void }) => {

  // Function to apply default image styling
  const applyDefaultImageStyles = (html: string) => {
    return html.replace(/<img(?![^>]*style=")([^>]+)>/g, '<img style="display: block; margin-left: auto; margin-right: auto;" $1>');
  };

  const handleChange = (value: string) => {
    // Apply default image styles before passing to onChange
    const styledContent = applyDefaultImageStyles(value);
    onChange(styledContent);
  };

  return (
    <ReactQuill
      value={content}
      onChange={handleChange}
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
  imageResize: {
    // Configuration for image resizing if needed
    modules: ['Resize', 'DisplaySize'],
  },
};

QuillEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'video',
  'code-block', 'align'
];

export default QuillEditor;
