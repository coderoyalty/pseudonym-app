import axios from "@/api/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Timer from "@/components/timer";
import { AxiosError } from "axios";

const RESEND_DURATION = 2 * 60; // 2mins.

const EmailVerificationForm: React.FC = () => {
  const { user, signin } = useAuth();
  const [value, setValue] = React.useState("");
  const [resendDuration, setDuration] = React.useState(RESEND_DURATION);
  const [showOTP, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  if (user.isEmailVerified) {
    return (
      <>
        <div className="flex flex-col justify-center gap-3 border p-4">
          <h1 className="text-center text-base font-semibold">
            Hurray! Your Email account is verified.
          </h1>

          <Input
            readOnly
            value={user.email}
            className="outline outline-1 bg-slate-200"
          />
        </div>
      </>
    );
  }

  const requestEmail = async () => {
    setLoading(true);
    try {
      await axios.post("/auth/request-verification-email", {
        userId: user.id,
      });
      setShow(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 429) {
          // too many request
        }
      }
      setShow(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    setSubmitLoading(true);
    try {
      const response = await axios.get(`/auth/verify-email/${value}`);
      signin(response.data.user);
    } catch (err) {
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <span>Email:</span>
        <div className="flex flex-col justify-center gap-3 border p-4">
          <Input
            readOnly
            value={user.email}
            className="outline outline-1 bg-slate-200"
          />
          <h1 className="text-center font-semibold">
            Your Email Address is not yet verified.
          </h1>
          {!showOTP ? (
            <Button onClick={() => requestEmail()} disabled={loading}>
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>Verify Email</>
              )}
            </Button>
          ) : (
            <div className="flex flex-col justify-center gap-3">
              <InputOTP
                containerClassName="mx-auto"
                value={value}
                onChange={(value) => setValue(value)}
                onSubmit={() => {
                  console.log("attempting to submit");
                }}
                maxLength={6}
                render={({ slots }) => (
                  <>
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  </>
                )}
              />
              <Button
                disabled={!/^\d{6}$/.test(value) || submitLoading}
                onClick={() => verifyEmail()}
              >
                {submitLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
              <Button
                variant={"secondary"}
                disabled={resendDuration !== 0 || loading}
                onClick={() => requestEmail()}
              >
                {resendDuration !== 0 ? (
                  <>
                    <Timer
                      duration={resendDuration}
                      updateDuration={setDuration}
                      render={(time) => <>Can resend in: {time}</>}
                    />
                  </>
                ) : loading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>Resend Verification Code</>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerificationForm;
