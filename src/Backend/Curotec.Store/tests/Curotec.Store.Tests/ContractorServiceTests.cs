using Curotec.Store.Business.Interfaces;
using Curotec.Store.Business.Models;
using Curotec.Store.Business.Notifications;
using Curotec.Store.Business.Services;
using FluentAssertions;
using Moq;
using System.Linq.Expressions;
using System.Reflection.Emit;

namespace Curotec.Store.Tests
{
    public class ContractorServiceTests
    {
        private readonly Mock<IContractorRepository> _contractorRepoMock;
        private readonly Mock<IAddressRepository> _addressRepoMock;
        private readonly Mock<INotifier> _notifierMock;
        private readonly ContractorService _service;

        public ContractorServiceTests()
        {
            _contractorRepoMock = new Mock<IContractorRepository>();
            _addressRepoMock = new Mock<IAddressRepository>();
            _notifierMock = new Mock<INotifier>();

            _service = new ContractorService(
                _contractorRepoMock.Object,
                _addressRepoMock.Object,
                _notifierMock.Object);
        }

        [Fact]
        public async Task Add_ValidContractor_ShouldAddSuccessfully()
        {
            var contractor = new Contractor
            {
                Id = Guid.NewGuid(),
                Name = "Valid Contractor",
                Document = "123456789",
                Address = new Address() { 
                    Address1 = "Address1",
                    Address2 = "Address2",
                    City = "City",
                    State = "STate",
                    ZipCode= "13154292"
                }
            };

            _contractorRepoMock
                .Setup(r => r.Get(It.IsAny<Expression<Func<Contractor, bool>>>()))
                .ReturnsAsync(new List<Contractor>());

            _contractorRepoMock
                .Setup(r => r.Add(contractor))
                .Returns(Task.CompletedTask);

            var result = await _service.Add(contractor);

            result.Should().BeTrue();
            _contractorRepoMock.Verify(r => r.Add(contractor), Times.Once);
            _notifierMock.Verify(n => n.Handle(It.IsAny<Notification>()), Times.Never);
        }

        [Fact]
        public async Task Add_DuplicatedDocument_ShouldNotifyAndReturnFalse()
        {
            var contractor = new Contractor
            {
                Id = Guid.NewGuid(),
                Name = "Duplicate",
                Document = "123456789",
                Address = new Address()
                {
                    Address1 = "Address1",
                    Address2 = "Address2",
                    City = "City",
                    State = "STate",
                    ZipCode = "13154292"
                }
            };

            _contractorRepoMock
                .Setup(r => r.Get(It.IsAny<Expression<Func<Contractor, bool>>>()))
                .ReturnsAsync(new List<Contractor> { contractor });

            var result = await _service.Add(contractor);

            result.Should().BeFalse();
            _notifierMock.Verify(n => n.Handle(It.Is<Notification>(n => n.Message.Contains("document"))), Times.Once);
        }

        [Fact]
        public async Task Update_ValidContractor_ShouldUpdateSuccessfully()
        {
            var contractor = new Contractor
            {
                Id = Guid.NewGuid(),
                Name = "Contractor Update",
                Document = "987654321",
                Address = new Address()
            };

            _contractorRepoMock
                .Setup(r => r.Get(It.IsAny<Expression<Func<Contractor, bool>>>()))
                .ReturnsAsync(new List<Contractor>());

            _contractorRepoMock
                .Setup(r => r.Update(contractor))
                .Returns(Task.CompletedTask);

            var result = await _service.Update(contractor);

            result.Should().BeTrue();
            _contractorRepoMock.Verify(r => r.Update(contractor), Times.Once);
            _notifierMock.Verify(n => n.Handle(It.IsAny<Notification>()), Times.Never);
        }

        [Fact]
        public async Task Update_DuplicatedDocument_ShouldNotifyAndReturnFalse()
        {
            var contractor = new Contractor
            {
                Id = Guid.NewGuid(),
                Name = "Duplicate Update",
                Document = "987654321",
                Address = new Address()
            };

            _contractorRepoMock
                .Setup(r => r.Get(It.IsAny<Expression<Func<Contractor, bool>>>()))
                .ReturnsAsync(new List<Contractor> { new Contractor { Id = Guid.NewGuid(), Document = "987654321" } });

            var result = await _service.Update(contractor);

            result.Should().BeFalse();
            _notifierMock.Verify(n => n.Handle(It.Is<Notification>(n => n.Message.Contains("document"))), Times.Once);
        }

        [Fact]
        public async Task UpdateAddress_ValidAddress_ShouldUpdateSuccessfully()
        {
            var address = new Address()
                {
                    Id = Guid.NewGuid(),
                    Address1 = "Address1",
                    Address2 = "Address2",
                    City = "City",
                    State = "STate",
                    ZipCode = "13154292"
                };

            _addressRepoMock
                .Setup(r => r.Update(address))
                .Returns(Task.CompletedTask);

            await _service.UpdateAddress(address);

            _addressRepoMock.Verify(r => r.Update(address), Times.Once);
        }

        [Fact]
        public async Task Delete_ContractorWithProducts_ShouldNotifyAndReturnFalse()
        {
            var contractorId = Guid.NewGuid();

            _contractorRepoMock.Setup(r => r.GetContractorProductsAddress(contractorId))
                .ReturnsAsync(new Contractor
                {
                    Products = new List<Product> { new Product() }
                });

            var result = await _service.Delete(contractorId);

            result.Should().BeFalse();
            _notifierMock.Verify(n => n.Handle(It.Is<Notification>(n => n.Message.Contains("products"))), Times.Once);
        }

        [Fact]
        public async Task Delete_ContractorWithoutProducts_ShouldDeleteSuccessfully()
        {
            var contractorId = Guid.NewGuid();
            var address = new Address { Id = Guid.NewGuid() };

            _contractorRepoMock.Setup(r => r.GetContractorProductsAddress(contractorId))
                .ReturnsAsync(new Contractor { Products = new List<Product>() });

            _addressRepoMock.Setup(r => r.GetAddressByContractor(contractorId))
                .ReturnsAsync(address);

            _addressRepoMock.Setup(r => r.Delete(address.Id)).Returns(Task.CompletedTask);
            _contractorRepoMock.Setup(r => r.Delete(contractorId)).Returns(Task.CompletedTask);

            var result = await _service.Delete(contractorId);

            result.Should().BeTrue();
            _addressRepoMock.Verify(r => r.Delete(address.Id), Times.Once);
            _contractorRepoMock.Verify(r => r.Delete(contractorId), Times.Once);
        }

        [Fact]
        public async Task UpdateAddress_AddressInvalid_ShouldNotCallRepositoryAndNotify()
        {
            // Arrange: endereço inválido (por exemplo, ZipCode vazio)
            var address = new Address
            {
                Id = Guid.NewGuid(),
                Address1 = "",
                City = "",
                State = "",
                ZipCode = ""
            };

            // Act
            await _service.UpdateAddress(address);

            // Assert
            _addressRepoMock.Verify(r => r.Update(It.IsAny<Address>()), Times.Never);
            _notifierMock.Verify(n => n.Handle(It.Is<Notification>(n => n.Message.Contains("provided") || n.Message.Contains("invalid"))), Times.AtLeastOnce);
        }
    }
}
