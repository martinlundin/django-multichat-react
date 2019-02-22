export const checkInputError = (props, fieldname) => {
    if(props.hasNestedProperties("error", "response", "data", fieldname)) {
        return "error"
    }
};
