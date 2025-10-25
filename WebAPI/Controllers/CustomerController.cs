using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CustomerController : ControllerBase
  {
    [HttpPost]
    public IActionResult SaveCustomerData(Models.CustomerRequestDto customerRequestDto)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Data Source=localhost;Initial Catalog=GadgetShop;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True"
      };
      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_SaveCustomerDetails",
        CommandType = CommandType.StoredProcedure,
        Connection = connection
      };
      command.Parameters.AddWithValue("@CustomerId", customerRequestDto.CustomerId);
      command.Parameters.AddWithValue("@FirstName", customerRequestDto.FirstName);
      command.Parameters.AddWithValue("@LastName", customerRequestDto.LastName);
      command.Parameters.AddWithValue("@RegistrationDate", customerRequestDto.RegistrationDate);
      command.Parameters.AddWithValue("@Email", customerRequestDto.Email);
      command.Parameters.AddWithValue("@PhoneNumber", customerRequestDto.PhoneNumber);

      connection.Open();

      command.ExecuteNonQuery();

      connection.Close();

      return Ok();
    }
    [HttpGet]
    public IActionResult GetCustomerData()
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Data Source=localhost;Initial Catalog=GadgetShop;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True"
      };
      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_GetCustomerDetails",
        CommandType = CommandType.StoredProcedure,
        Connection = connection
      };


      connection.Open();

      List<CustomerDto> response = new List<CustomerDto>();

      using (SqlDataReader sqlDataReader = command.ExecuteReader())
      {
        while (sqlDataReader.Read())
        {
          CustomerDto customerDto = new CustomerDto();
          customerDto.CustomerId = Convert.ToInt32(sqlDataReader["CustomerId"]);
          customerDto.FirstName = sqlDataReader["FirstName"].ToString();
          customerDto.LastName = sqlDataReader["LastName"].ToString();
          customerDto.Email = sqlDataReader["Email"].ToString();
          customerDto.PhoneNumber = sqlDataReader["PhoneNumber"].ToString();
          customerDto.RegistrationDate = Convert.ToString(sqlDataReader["RegistrationDate"]);
          response.Add(customerDto);
        }
      }


      connection.Close();

      return Ok(JsonConvert.SerializeObject(response));
    }
    [HttpDelete]
    public IActionResult DeleteCustomerData(int CustomerId)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Data Source=localhost;Initial Catalog=GadgetShop;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True"
      };
      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_DeleteCustomerDetails",
        CommandType = CommandType.StoredProcedure,
        Connection = connection
      };

      connection.Open();

      command.Parameters.AddWithValue("@CustomerId", CustomerId);

      command.ExecuteNonQuery();

      connection.Close();

      return Ok(CustomerId);
    }
    [HttpPut]
    public IActionResult EditCustomerData(CustomerRequestDto customerRequestDto)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Data Source=localhost;Initial Catalog=GadgetShop;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True"
      };
      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_EditCustomerDetails",
        CommandType = CommandType.StoredProcedure,
        Connection = connection
      };

      connection.Open();

      command.Parameters.AddWithValue("@CustomerID", customerRequestDto.CustomerId);
      command.Parameters.AddWithValue("@FirstName", customerRequestDto.FirstName);
      command.Parameters.AddWithValue("@LastName", customerRequestDto.LastName);
      command.Parameters.AddWithValue("@Email", customerRequestDto.Email);
      command.Parameters.AddWithValue("@PhoneNumber", customerRequestDto.PhoneNumber);
      command.Parameters.AddWithValue("@RegistrationDate", customerRequestDto.RegistrationDate);


      command.ExecuteNonQuery();

      connection.Close();

      return Ok();
    }
  }
}
