import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import Avatar from '@mui/material/Avatar';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import type { StepIconProps } from '@mui/material/StepIcon';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { JobCategoryStep } from './job-category-step';
import { JobDescriptionStep } from './job-description-step';
import { JobDetailsStep } from './job-details-step';
import { JobPreview } from './job-preview';

const StepIcon: FC<StepIconProps> = (props) => {
  const { active, completed, icon } = props;

  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText'
        })
      }}
      variant="rounded"
    >
      {
        completed
          ? (
            <SvgIcon>
              <CheckIcon />
            </SvgIcon>
          )
          : icon
      }
    </Avatar>
  );
};

export const JobCreateForm: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleNext = useCallback(
    () => {
      setActiveStep((prevState) => prevState + 1);
    },
    []
  );

  const handleBack = useCallback(
    () => {
      setActiveStep((prevState) => prevState - 1);
    },
    []
  );

  const handleComplete = useCallback(
    () => {
      setIsComplete(true);
    },
    []
  );

  const steps = useMemo(
    () => {
      return [
        {
          label: 'Category',
          content: (
            <JobCategoryStep
              onBack={handleBack}
              onNext={handleNext}
            />
          )
        },
        {
          label: 'Job Details',
          content: (
            <JobDetailsStep
              onBack={handleBack}
              onNext={handleNext}
            />
          )
        },
        {
          label: 'Description',
          content: (
            <JobDescriptionStep
              onBack={handleBack}
              onNext={handleComplete}
            />
          )
        }
      ];
    },
    [handleBack, handleNext, handleComplete]
  );

  if (isComplete) {
    return <JobPreview />;
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        '& .MuiStepConnector-line': {
          borderLeftColor: 'divider',
          borderLeftWidth: 2,
          ml: 1
        }
      }}
    >
      {steps.map((step, index) => {
        const isCurrentStep = activeStep === index;

        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography
                sx={{ ml: 2 }}
                variant="overline"
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent
              sx={{
                borderLeftColor: 'divider',
                borderLeftWidth: 2,
                ml: '20px',
                ...(isCurrentStep && {
                  py: 4
                })
              }}
            >
              {step.content}
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
};
