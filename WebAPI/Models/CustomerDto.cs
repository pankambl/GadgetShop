namespace WebAPI.Models
{
  public class CustomerDto
  {
    #region properties
    public int CustomerId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string RegistrationDate { get; set; }

    #endregion
  }
}
