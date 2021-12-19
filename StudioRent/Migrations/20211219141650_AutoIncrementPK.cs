using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StudioRent.Migrations
{
    public partial class AutoIncrementPK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    idRoom = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    size = table.Column<int>(type: "int", nullable: false),
                    description = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: false),
                    photosLocation = table.Column<string>(type: "varchar(70)", unicode: false, maxLength: 70, nullable: true),
                    morningPrice = table.Column<int>(type: "int", nullable: false),
                    eveningPrice = table.Column<int>(type: "int", nullable: false),
                    indivPrice = table.Column<int>(type: "int", nullable: false),
                    capacity = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.idRoom);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    idUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    lastName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    phoneNumber = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.idUser);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    idBooking = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idUser = table.Column<int>(type: "int", nullable: false),
                    idRoom = table.Column<int>(type: "int", nullable: false),
                    hourFrom = table.Column<int>(type: "int", nullable: false),
                    hourTo = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<DateTime>(type: "date", nullable: false),
                    numPeople = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.idBooking);
                    table.ForeignKey(
                        name: "FK_Bookings_Rooms",
                        column: x => x.idRoom,
                        principalTable: "Rooms",
                        principalColumn: "idRoom",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Bookings_Users",
                        column: x => x.idUser,
                        principalTable: "Users",
                        principalColumn: "idUser",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_idRoom",
                table: "Bookings",
                column: "idRoom");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_idUser",
                table: "Bookings",
                column: "idUser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
