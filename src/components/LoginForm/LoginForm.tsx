import React, { useState, ChangeEvent, MouseEvent } from "react";
import { useRouter } from "next/router";
import useUser from "@jokejunction/hooks/useUser";
import {
  validateForm,
  loginValidationRules,
} from "@jokejunction/utils/validation";
import ErrorText from "@jokejunction/components/ErrorText";
import styles from "./LoginForm.module.scss";
import { Errors } from "@jokejunction/types";

interface LoginFormProps {
  className?: string;
  isDarkMode?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, isDarkMode }) => {
  const router = useRouter();
  const { setUser } = useUser();
  const [errors, setErrors] = useState<Errors>({});

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevLoginValues) => ({
      ...prevLoginValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const isLoginFormValid = validateForm(
      loginData,
      loginValidationRules,
      setErrors
    );

    if (isLoginFormValid) {
      // Generate temporary demo auth token
      localStorage.setItem("token", "Temporary unsecure token for demo");
      setUser(loginData.username);

      const queryParams = { page: 1, perPage: 5 };

      router.push({
        pathname: "/dashboard",
        query: queryParams,
      });
    }
  };

  return (
    <form className={`${styles.form} ${className}`}>
      <div className={styles.control}>
        <label className={styles.label} htmlFor="username">
          Username:
        </label>
        <input
          className={isDarkMode ? styles.inputDark : styles.inputLight}
          id="username"
          required
          name="username"
          value={loginData.username}
          onChange={handleInputChange}
          type="text"
        />
        {errors.username && <ErrorText text={errors.username} />}
      </div>
      <div className={styles.control}>
        <label className={styles.label} htmlFor="password">
          Password:
        </label>
        <input
          className={isDarkMode ? styles.inputDark : styles.inputLight}
          id="password"
          name="password"
          required
          type="password"
          value={loginData.password}
          onChange={handleInputChange}
        />
        {errors.password && <ErrorText text={errors.password} />}
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className={
            isDarkMode ? styles.buttonPrimaryDark : styles.buttonPrimaryLight
          }
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
