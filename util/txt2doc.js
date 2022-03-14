const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require('fs');

const txt2doc = (txtContent, fileName) => {
    const doc = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "defaultParagraph",
                    name: "DefaultParagraph",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: process.env.FONTSIZE? process.env.FONTSIZE : 32,
                        font: process.env.FONTFAMILY? process.env.FONTFAMILY : 'THSarabunNew'
                    }
                }
            ],
        },
        sections: [{
            properties: {},
            children: lineBreak2TextRun(txtContent),
        }],
    });
    
    // Used to export the file into a .docx file
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(`${fileName}.docx`, buffer);
    });
}


const lineBreak2TextRun = (txtContent) => {
    const textRun = txtContent.split(/\r?\n/);
    
    ParagraphChild = []
    for(let i = 0; i < textRun.length; i++){
        ParagraphChild.push(
            new Paragraph({
                text: textRun[i],
                style: "defaultParagraph"
            })
        )
    }

    return ParagraphChild
}
module.exports = txt2doc