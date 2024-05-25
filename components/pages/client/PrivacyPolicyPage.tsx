"use client";
import {
  getPrivacyPolicyAction,
  privacyPolicySelector,
} from "@/redux/features/adminpanel/privacyPolicy/privacy.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";

type Props = {};

function PrivacyPolicyPage({}: Props) {
  const dispatch = useAppDispatch();
  const { status, policy } = useAppSelector(privacyPolicySelector);
  useEffect(() => {
    dispatch(getPrivacyPolicyAction());
  }, []);
  console.log(policy.content);

  return (
    <div className="section-padding mt-6 lg:mt-20"> 
      <div dangerouslySetInnerHTML={{ __html: policy.content }} />
    </div>
  );
}

export default PrivacyPolicyPage;
