import { SxProps, TableRow } from "@mui/material";
import styled from "@emotion/styled";

  //for modAl

export const style:SxProps = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

// color table
  export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f8f9fb;
  }

  font-family: "Poppins" !important;
`;
//select border
export const selectStyle:SxProps={
    color: "#1F263E",
    fontFamily: "Poppins",
    fontSize: "14px",
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
      {
        border: 0,
      },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        border: 0,
      },
}
  //spilt numbers createdAt
export const Numbers = (dateString: string): string => {
    const afterDecimal = dateString.split(".")[1]?.split("Z")[0];
    return afterDecimal || "";
  };

export const TableBorderRow:SxProps  ={
    bgcolor: "#E2E5EB",
    m: 0,
    "&:last-child td, &:last-child th": { border: 0 },
    color: "#1F263E",
    fontWeight: 500,
    fontFamily: "Poppins",
  }

export const FirstCell:SxProps ={
    p: 3,
    borderTopLeftRadius: "1rem",
    borderBottomLeftRadius: "1rem",
    color: "#1F263E",
    fontWeight: 500,
    fontFamily: "Poppins",
  }

  export const LastCell:SxProps ={
    color: "#1F263E",
    fontWeight: 500,
    fontFamily: "Poppins",
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem",
  }