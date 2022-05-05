import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 350,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const InformationTooltip = ({ ...props }) => {
  const { children, buttonText } = props;
  return (
    <div>
      <HtmlTooltip
        enterDelay={200}
        leaveDelay={300}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}
        placement="left-end"
        title={
          //   <React.Fragment>
          //     <Typography color="inherit">Tooltip with HTML</Typography>
          //     <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
          //     {"It's very engaging. Right?"}
          //   </React.Fragment>
          children
        }
      >
        <Button variant={"outlined"} color={"primary"} size="medium">{buttonText}</Button>
      </HtmlTooltip>
    </div>
  );
};
export default InformationTooltip;
