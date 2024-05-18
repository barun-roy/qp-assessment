import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      return res.status(400).json({ errors: formatErrors(errors) });
    }
    next();
  };
}

function formatErrors(errors: ValidationError[]) {
  return errors.map((err) => ({
    property: err.property,
    constraints: err.constraints,
  }));
}
