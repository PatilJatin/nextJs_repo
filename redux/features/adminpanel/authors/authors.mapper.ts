import { AUTHOR_FORM_FIELDS } from "@/components/authors/form/AuthorFormProvider";
import { AUTHORS_RESPONSE, AUTHOR_MODEL } from "@/types/authors.types";

export const mapResponseToAuthorModel = (
  data: AUTHORS_RESPONSE
): AUTHOR_MODEL => {
  return {
    _id: data._id,
    createdAt: data.createdAt,
    description: data.description,
    image: data.image,
    name: data.name,
    updatedAt: data.updatedAt,
  };
};

export const mapResponseToAuthorForm = (
  data: AUTHORS_RESPONSE
): AUTHOR_FORM_FIELDS => {
  return {
    imageInput: "",
    description: data.description,
    image: data.image,
    name: data.name,
  };
};
