namespace WebAPI.Models
{
  public class CustomerRequestDto
  {
    #region properties
    public int CustomerId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public DateTime RegistrationDate { get; set; }
    #endregion
  }
}
