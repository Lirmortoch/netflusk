import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ConfirmAccount({}) {
  const { request_token } = useParams();

  useEffect(() => {
    const approvalUrl = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
    window.location.href = approvalUrl;
  }, []);

  return null;
}