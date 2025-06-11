import { Box, Typography } from "@mui/material";
import { Grid2 } from "@mui/material/";
import {
  Check,
  Close,
  LocalShipping,
  CheckCircle,
  Cancel,
  Inventory,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
interface StepItem {
  label: string;
  timestamp: string;
  key: "processing" | "isShipping" | "completed" | "cancelled";
  
}

interface OrderProgressProps {
  status: string;
  date?: string;
}

export default function OrderProgress({ status, date }: OrderProgressProps) {
  //   format date: dd/MM/yyyy - HH:mm
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  //   cộng ngày
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const getSteps = () => {
  const baseDate = date ? new Date(date) : new Date();
  let finalStep: StepItem;
  let shippingStep: StepItem;
  if (status === "PENDING_CONFIRMATION" || status === "CONFIRMED") {
    shippingStep = {
      label: "Đang giao hàng",
      timestamp: "",
      key: "isShipping",
    };
  }else {
    shippingStep = {
      label: "Đang giao hàng",
      timestamp: formatDate(baseDate),
      key: "isShipping",
    };
  }
  if (status === "DELIVERED") {
    const completedDate = addDays(baseDate, 3);
    finalStep = {
      label: "Hoàn tất",
      timestamp: formatDate(completedDate),
      key: "completed",
    };
  } else if (status === "CANCELED") {
    finalStep = {
      label: "Đã hủy",
      timestamp: formatDate(baseDate),
      key: "cancelled",
    };
  } else {
    finalStep = {
      label: "Hoàn tất",
      timestamp: "",
      key: "completed",
    };
  }

  return [
    {
      label: "Đang xử lý",
      timestamp: formatDate(baseDate),
      key: "processing",
    },
    shippingStep,
    finalStep,
  ];
};

  const steps = getSteps();
  const getCurrentStepIndex = () => {
    switch (status) {
      case "PENDING_CONFIRMATION":
      case "CONFIRMED":
        return 0; // Đang xử lý
      case "SHIPPING":
        return 1; // Đang giao hàng
      case "DELIVERED":
      case "CANCELED":
        return 2; // Hoàn tất hoặc Đã hủy
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStepIndex();
  const getBackgroundColor = (status: string) => {
    if (status === "DELIVERED") return "#f0fbea";
    if (status === "CANCELED") return "#ffecec";
    return "#f5f5f5";
  };
 const renderStepIcon = (stepKey: StepItem["key"]) => {
  const color = getIconColor(stepKey);

  switch (stepKey) {
    case "processing":
      return <Inventory fontSize="large" sx={{ color }} />;
    case "isShipping":
      return <LocalShipping fontSize="large" sx={{ color }} />;
    case "completed":
      return <CheckCircle fontSize="large" sx={{ color }} />;
    case "cancelled":
      return <Cancel fontSize="large" sx={{ color }} />;
    default:
      return null;
  }
};
const getIconColor = (stepKey: StepItem["key"]) => {
  if (status === "CANCELED") return "error.main";

  if (stepKey === "processing" && currentStep >= 0) return "success.main";
  if (stepKey === "isShipping" && currentStep >= 1) return "success.main";
  if (stepKey === "completed" && currentStep >= 2) return "success.main";

  return "grey.300";
};


  const isCancelled = status === "CANCELED";
  const activeColor = isCancelled ? "error.main" : "success.main";
  const inactiveColor = "grey.300";
  return (
    <Box
      sx={{
        bgcolor: getBackgroundColor(status),
        p: 3,
        borderRadius: 2,
        marginTop: 2,
      }}
    >
      {/* Row 1: Icon + Label + Timestamp */}
      <Grid2 container justifyContent="space-between" alignItems="center">
        {steps.map((step, index) => (
          <Grid2 key={index} sx={{ xs: 12, sm: 6, md: 3 }}>
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
               {renderStepIcon(step.key as "processing" | "isShipping" | "completed" | "cancelled")}
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
                bgcolor: isLineGreen ? activeColor : inactiveColor,
                zIndex: 1,
              }}
            />
          );
        })}

        {/* Step Circles */}
        <Grid2
          container
          justifyContent="space-between"
          sx={{ position: "relative", zIndex: 2 }}
        >
          {steps.map((_, index) => {
            const isCompleted = index < currentStep || status === "completed";
            const isActive = index === currentStep && status !== "completed";

            return (
              <Box
                key={index}
                sx={{
                  marginTop: "3px",
                  marginLeft: "2px",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor:
                    isCompleted || isActive ? activeColor : inactiveColor,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {isCompleted ? (
                  isCancelled ? (
                    <Close fontSize="small" />
                  ) : (
                    <Check fontSize="small" />
                  )
                ) : (
                  index + 1
                )}
              </Box>
            );
          })}
        </Grid2>
      </Box>
    </Box>
  );
}
