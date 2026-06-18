import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "Employee",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await registerUser(
          formData
        );

      alert(
        response.data.message
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Employee",
      });
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="Employee">
            Employee
          </option>

          <option value="Manager">
            Manager
          </option>

          <option value="Admin">
            Admin
          </option>
        </select>

        <br />
        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;