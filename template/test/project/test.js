const fs = require('fs');
const path = require('path');
const Generator = require('@asyncapi/generator'); 

const asyncapiFile = path.join(__dirname, '../fixtures/sample.yml');
const outputDir = path.resolve(__dirname, '../project'); 
const templateDir = path.resolve(__dirname, '../../template'); 

async function testPdfGeneration() {

  const generator = new Generator(templateDir, { output: outputDir });

  // Generate the output
  await generator.generateFromFile(asyncapiFile, { 
    templateParams: { pdf: true } 
  });

  const pdfFile = path.join(outputDir, 'index.pdf');
  if (fs.existsSync(pdfFile)) {
    console.log('PDF generated successfully:', pdfFile);
  } else {
    console.error('PDF generation failed.');
  }
}

testPdfGeneration();

