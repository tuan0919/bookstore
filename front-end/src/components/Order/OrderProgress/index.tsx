import { Box, Typography } from "@mui/material";
import {Grid2} from "@mui/material/";
import { Check, ReceiptLong, LocalShipping, CheckCircle, Cancel, Inventory } from "@mui/icons-material";
import { grey } from '@mui/material/colors';
interface StepItem {
  label: string;
  timestamp: string;
  key: "new" | "processing" |"isShipping" | "completed";
  icon: React.ReactNode;
}

const steps: StepItem[] = [
  {
    label: "Đơn hàng mới",
    timestamp: "23/09/2022 - 10:42",
    key: "new",
    icon: <ReceiptLong fontSize="large" sx={{ color: "success.main" }} />,
  },
  {
    label: "Đang xử lý",
    timestamp: "23/09/2022 - 10:45",
    key: "processing",
    icon: <Inventory fontSize="large" sx={{ color: "success.main" }}/>,
  },
  {
    label: "Đang giao hàng",
    timestamp: "07/10/2022 - 04:46",
    key: "isShipping",
    icon: <LocalShipping fontSize="large" sx={{ color: "success.main" }} />,
  },
  {
    label: "Hoàn tất",
    timestamp: "07/10/2022 - 04:46",
    key: "completed",
    icon: <CheckCircle fontSize="large" sx={{ color: "success.main" }} />,
  },
];

interface OrderProgressProps {
  status: string;
}

const getStatusIndex = (status: OrderProgressProps["status"]) =>
  steps.findIndex((step) => step.key === status);

export default function OrderProgress({ status }: OrderProgressProps) {
  const currentStep = getStatusIndex(status);

  return (
    <Box sx={{ bgcolor: "#f0fbea", p: 3, borderRadius: 2 , marginTop: 2}}>
      {/* Row 1: Icon + Label + Timestamp */}
      <Grid2 container justifyContent="space-between" alignItems="center">
  {steps.map((step, index) => (
    <Grid2 key={index} sx={{xs:12, sm: 6, md: 3}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2, // khoảng cách giữa icon và nội dung
        }}
      >
        <Box
          width={50}
          height={50}
          sx={{
            backgroundColor: grey[50],
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {step.icon}
        </Box>
        <Box>
          <Typography fontWeight="bold">{step.label}</Typography>
          <Typography variant="body2" color="text.secondary">
            {step.timestamp}
          </Typography>
        </Box>
      </Box>
    </Grid2>
  ))}
</Grid2>

      {/* Stepper line + circles */}
      <Box
        sx={{
          mt: 4,
          position: "relative",
          px: 3,
          height: 40,
          left: -15,
          
        }}
      >
        {/* Line connectors */}
        {steps.map((_, index) => {
          if (index === steps.length - 1) return null;

          // Dòng trước bước hiện tại hoặc đang ở bước cuối thì đường đều xanh
          const isLineGreen = currentStep > index;

          return (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: "50%",
                left: `calc(${(index / (steps.length - 1)) * 100}% + 16px)`,
                width: `calc(${100 / (steps.length - 1)}% )`,
                height: 2,
                bgcolor: isLineGreen ? "success.main" : "grey.300",
                zIndex: 1,
              }}
            />
          );
        })}

        {/* Step Circles */}
        <Grid2 container justifyContent="space-between" sx={{ position: "relative", zIndex: 2 }}>
          {steps.map((_, index) => {
            const isCompleted = index < currentStep || status === "completed";
            const isActive = index === currentStep && status !== "completed";

            return (
              <Box
                key={index}
                sx={{
                  marginTop:"3px",
                  marginLeft:"2px",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: isCompleted || isActive ? "success.main" : "grey.300",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {isCompleted ? <Check fontSize="small" /> : index + 1}
              </Box>
            );
          })}
        </Grid2>
      </Box>
    </Box>
  );
}
