using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using MvcTest.Models;

namespace MvcTest.DAL
{
    public class CustomerDB : DbContext
    {
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Customer>().ToTable("tblCustomers");//table mapping
            modelBuilder.Entity<Order>().ToTable("tblOrders");
            modelBuilder.Entity<Customer>().Property(x => x.CustomerCode).HasColumnName("CustomerCode");//column mapping
        }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Order> Orders { get; set; }
    }
}