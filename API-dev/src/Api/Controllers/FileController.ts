import { importGiftFileHandler } from "../../Application/Features/File/Handlers/ImportGiftFileHandler";
import { Request, Response } from "express";

export default class FileController {
    async importGiftFile(req: Request, res: Response): Promise<Response> {
        // #swagger.description = "Import a gift file"
        // #swagger.tags = ["Files"]
        /*
        #swagger.parameters['file'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
        },
        */
        try {
            const file: any = req.file;
            const filePath = file.path
            const result: any = await importGiftFileHandler(filePath);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}