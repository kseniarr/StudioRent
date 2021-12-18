﻿using Microsoft.EntityFrameworkCore;

#nullable disable

namespace StudioRent.Models
{
    public partial class StudioRentDbContext : DbContext
    {
        public StudioRentDbContext()
        {
        }

        public StudioRentDbContext(DbContextOptions<StudioRentDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<User> Users { get; set; }

       /* protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=LAPTOP-3B18L4D0;initial catalog=StudioRent;Integrated Security=True;ConnectRetryCount=0");
            }
        }*/

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(e => e.IdBooking);

                entity.Property(e => e.IdBooking)
                    .ValueGeneratedNever()
                    .HasColumnName("idBooking");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.HourFrom).HasColumnName("hourFrom");

                entity.Property(e => e.HourTo).HasColumnName("hourTo");

                entity.Property(e => e.IdRoom).HasColumnName("idRoom");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.NumPeople).HasColumnName("numPeople");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.HasOne(d => d.IdRoomNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.IdRoom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bookings_Rooms");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bookings_Users");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasKey(e => e.IdRoom);

                entity.Property(e => e.IdRoom)
                    .ValueGeneratedNever()
                    .HasColumnName("idRoom");

                entity.Property(e => e.Capacity).HasColumnName("capacity");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.EveningPrice).HasColumnName("eveningPrice");

                entity.Property(e => e.IndivPrice).HasColumnName("indivPrice");

                entity.Property(e => e.MorningPrice).HasColumnName("morningPrice");

                entity.Property(e => e.PhotosLocation)
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("photosLocation");

                entity.Property(e => e.Size).HasColumnName("size");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("title");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser);

                entity.Property(e => e.IdUser)
                    .ValueGeneratedNever()
                    .HasColumnName("idUser");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("firstName");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("lastName");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("phoneNumber");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}