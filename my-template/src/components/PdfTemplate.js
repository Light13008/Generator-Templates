
import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import PdfContent from './PdfContent';
import ReactDOMServer from 'react-dom/server';

const PdfTemplate = () => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [asyncapiData, setAsyncapiData] = useState({
    title: 'My AsyncAPI PDF Template',
    description: 'A template for generating PDFs from AsyncAPI specifications.',
    channels: [
      { name: 'myChannel', description: 'A channel for sending messages.' },

    ],
  });

  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Render the PDF content using the PdfContent component
    const content = (
      <PdfContent
        title={asyncapiData.title}
        description={asyncapiData.description}
        channels={asyncapiData.channels}
      />
    );

    // Convert the React component to a string
    const contentString = ReactDOMServer.renderToStaticMarkup(content);

   
    page.drawText(contentString, {
      x: 50,
      y: 350,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    setPdfBytes(pdfBytes);
  };

  return (
    <div>
      <button onClick={generatePdf}>Generate PDF</button>
      {pdfBytes && (
        <a href={`data:application/pdf;base64,${pdfBytes}`} download="asyncapi.pdf">
          Download PDF
        </a>
      )}
    </div>
  );
};

export default PdfTemplate;
