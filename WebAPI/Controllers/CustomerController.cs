using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

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
  }
}
