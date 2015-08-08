using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.ModelBinding;

namespace MvcTest.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage ="Customer Name should not have more than 10 charactors")]
        public string CustomerName { get; set; }

        [Required]
        [RegularExpression("^[A-Z]{3}[0-9]{4}$")]
        public string CustomerCode { get; set; }

        public decimal? CustomerAmount { get; set; }

        public List<Order> CustomerOrders = new List<Order>();
    }
}