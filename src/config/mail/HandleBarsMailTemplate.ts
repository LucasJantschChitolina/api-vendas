import handlebars from 'handlebars';
import fs from 'fs';

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export interface ITemplateVariables {
  [key: string]: string | number;
}

export default class handleBarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf8'
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
