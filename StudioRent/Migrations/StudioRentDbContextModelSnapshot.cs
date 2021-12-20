﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StudioRent.Models;

namespace StudioRent.Migrations
{
    [DbContext(typeof(StudioRentDbContext))]
    partial class StudioRentDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.13")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("StudioRent.Models.Booking", b =>
                {
                    b.Property<int>("IdBooking")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("idBooking")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("date")
                        .HasColumnName("date");

                    b.Property<int>("HourFrom")
                        .HasColumnType("int")
                        .HasColumnName("hourFrom");

                    b.Property<int>("HourTo")
                        .HasColumnType("int")
                        .HasColumnName("hourTo");

                    b.Property<int>("IdRoom")
                        .HasColumnType("int")
                        .HasColumnName("idRoom");

                    b.Property<int>("IdUser")
                        .HasColumnType("int")
                        .HasColumnName("idUser");

                    b.Property<int>("NumPeople")
                        .HasColumnType("int")
                        .HasColumnName("numPeople");

                    b.Property<double>("Price")
                        .HasColumnType("float")
                        .HasColumnName("price");

                    b.HasKey("IdBooking");

                    b.HasIndex("IdRoom");

                    b.HasIndex("IdUser");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("StudioRent.Models.Room", b =>
                {
                    b.Property<int>("IdRoom")
                        .HasColumnType("int")
                        .HasColumnName("idRoom");

                    b.Property<int?>("Capacity")
                        .HasColumnType("int")
                        .HasColumnName("capacity");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(200)
                        .IsUnicode(false)
                        .HasColumnType("varchar(200)")
                        .HasColumnName("description");

                    b.Property<int>("EveningPrice")
                        .HasColumnType("int")
                        .HasColumnName("eveningPrice");

                    b.Property<int>("IndivPrice")
                        .HasColumnType("int")
                        .HasColumnName("indivPrice");

                    b.Property<int>("MorningPrice")
                        .HasColumnType("int")
                        .HasColumnName("morningPrice");

                    b.Property<string>("PhotosLocation")
                        .HasMaxLength(70)
                        .IsUnicode(false)
                        .HasColumnType("varchar(70)")
                        .HasColumnName("photosLocation");

                    b.Property<int>("Size")
                        .HasColumnType("int")
                        .HasColumnName("size");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("title");

                    b.HasKey("IdRoom");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("StudioRent.Models.User", b =>
                {
                    b.Property<int>("IdUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("idUser")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("firstName");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("lastName");

                    b.Property<byte[]>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varbinary(100)")
                        .HasColumnName("password");

                    b.Property<byte[]>("PasswordKey")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("IdUser");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("StudioRent.Models.Booking", b =>
                {
                    b.HasOne("StudioRent.Models.Room", "IdRoomNavigation")
                        .WithMany("Bookings")
                        .HasForeignKey("IdRoom")
                        .HasConstraintName("FK_Bookings_Rooms")
                        .IsRequired();

                    b.HasOne("StudioRent.Models.User", "IdUserNavigation")
                        .WithMany("Bookings")
                        .HasForeignKey("IdUser")
                        .HasConstraintName("FK_Bookings_Users")
                        .IsRequired();

                    b.Navigation("IdRoomNavigation");

                    b.Navigation("IdUserNavigation");
                });

            modelBuilder.Entity("StudioRent.Models.Room", b =>
                {
                    b.Navigation("Bookings");
                });

            modelBuilder.Entity("StudioRent.Models.User", b =>
                {
                    b.Navigation("Bookings");
                });
#pragma warning restore 612, 618
        }
    }
}
