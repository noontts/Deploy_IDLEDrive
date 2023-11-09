import React from 'react'
import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
    allowedTags: ['iframe'],
    allowedAttributes: {
      'iframe': ['src', 'class', 'width', 'height', 'allowfullscreen', 'loading', 'referrerPolicy']
    },
    allowedIframeHostnames: ['www.google.com']
  };

  const sanitize = (dirty, options) => ({
    __html: sanitizeHtml(
      dirty,
      { ...defaultOptions, ...options }
    )
  });

const SanitizeHTML = ({ html, options }) => {
  return (
    <div className='mt-6' dangerouslySetInnerHTML={sanitize(html, options)} />
  )
}

export default SanitizeHTML