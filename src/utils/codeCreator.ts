export default function codeCreator(startCode: string, midCode:string, endCode:string) {
  return `${startCode}
    
    ${midCode}

    ${endCode}

`;
} 


// for every language, start,mid,end will differ,
// for python, endCode can be passed as empty string

