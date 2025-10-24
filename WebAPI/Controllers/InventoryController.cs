using GadgetShopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace GadgetShopAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class InventoryController : ControllerBase
  {
    [HttpPost]
    public IActionResult SaveInventoryData(InventoryRequestDto requestDto)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Data Source=localhost;Initial Catalog=GadgetShop;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True"
      };
      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_SaveInventoryData",
        CommandType = CommandType.StoredProcedure,
        Connection = connection
      };
      command.Parameters.AddWithValue("@ProductId", requestDto.ProductId);
      command.Parameters.AddWithValue("@ProductName", requestDto.ProductName);
      command.Parameters.AddWithValue("@AvailableQty", requestDto.AvailableQty);
      command.Parameters.AddWithValue("@ReOrderPoint", requestDto.ReOrderPoint);

      connection.Open();

      command.ExecuteNonQuery();

      connection.Close();

      return Ok();
    }

    [HttpGet]
    public IActionResult GetInventoryData()
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Data Source=localhost;Initial Catalog=GadgetShop;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True"
      };
      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_GetInventoryData",
        CommandType = CommandType.StoredProcedure,
        Connection = connection
      };
      connection.Open();

      List<InventoryDto> response = new List<InventoryDto>();

      using (SqlDataReader sqlDataReader = command.ExecuteReader())
      {
        while (sqlDataReader.Read())
        {
          InventoryDto inventoryDto = new InventoryDto();
          inventoryDto.ProductId = Convert.ToInt32(sqlDataReader["ProductId"]);
          inventoryDto.ProductName = sqlDataReader["ProductName"].ToString();
          inventoryDto.AvailableQty = Convert.ToInt32(sqlDataReader["AvailableQty"]);
          inventoryDto.ReOrderPoint = Convert.ToInt32(sqlDataReader["ReOrderPoint"]);

          response.Add(inventoryDto);
        }
      }

      connection.Close();

      return Ok(response);
    }
    [HttpDelete]
    public IActionResult DeleteInventoryData(int productId)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Data Source=localhost;Initial Catalog=GadgetShop;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True"
      };
      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_DeleteInventoryDetails",
        CommandType = CommandType.StoredProcedure,
        Connection = connection
      };
      connection.Open();

      command.Parameters.AddWithValue("@ProductId", productId);

      command.ExecuteNonQuery();

      connection.Close();

      return Ok();
    }

    [HttpPut]
    public IActionResult EditInventoryData(InventoryRequestDto inventoryRequest)
    {
      SqlConnection connection = new SqlConnection
      {
        ConnectionString = "Data Source=localhost;Initial Catalog=GadgetShop;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True"
      };
      SqlCommand command = new SqlCommand
      {
        CommandText = "sp_EditInventoryDetails",
        CommandType = CommandType.StoredProcedure,
        Connection = connection
      };
      connection.Open();

      command.Parameters.AddWithValue("@ProductId", inventoryRequest.ProductId);
      command.Parameters.AddWithValue("@ProductName", inventoryRequest.ProductName);
      command.Parameters.AddWithValue("@AvailableQty", inventoryRequest.AvailableQty);
      command.Parameters.AddWithValue("@ReorderPoint", inventoryRequest.ReOrderPoint);

      command.ExecuteNonQuery();

      connection.Close();

      return Ok();
    }
  }
}
