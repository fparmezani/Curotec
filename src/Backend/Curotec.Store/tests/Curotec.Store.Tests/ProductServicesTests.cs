using Xunit;
using Moq;
using FluentAssertions;
using Curotec.Store.Business.Interfaces;
using Curotec.Store.Business.Models;
using Curotec.Store.Business.Services;
using Curotec.Store.Business.Notifications;
using System;
using System.Threading.Tasks;

namespace Curotec.Store.Tests
{
    public class ProductServiceTests
    {
        private readonly Mock<IProductRepository> _productRepoMock;
        private readonly Mock<INotifier> _notifierMock;
        private readonly ProductService _service;

        public ProductServiceTests()
        {
            _productRepoMock = new Mock<IProductRepository>();
            _notifierMock = new Mock<INotifier>();

            _service = new ProductService(
                _productRepoMock.Object,
                _notifierMock.Object);
        }

        [Fact]
        public async Task Add_ValidProduct_ShouldCallRepositoryAdd()
        {
            // Arrange
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Valid Product",
                Description = "A valid product",
                Value = 10
            };

            _productRepoMock.Setup(r => r.Add(product))
                .Returns(Task.CompletedTask);

            // Act
            await _service.Add(product);

            // Assert
            _productRepoMock.Verify(r => r.Add(product), Times.Once);
            _notifierMock.Verify(n => n.Handle(It.IsAny<Notification>()), Times.Never);
        }

        [Fact]
        public async Task Add_InvalidProduct_ShouldNotCallRepositoryAndNotify()
        {
            // Arrange
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = "", // Nome inválido
                Description = "",
                Value = 0  // Preço inválido
            };

            // Act
            await _service.Add(product);

            // Assert
            _productRepoMock.Verify(r => r.Add(It.IsAny<Product>()), Times.Never);
            _notifierMock.Verify(n => n.Handle(It.IsAny<Notification>()), Times.AtLeastOnce);
        }

        [Fact]
        public async Task Update_ValidProduct_ShouldCallRepositoryUpdate()
        {
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Updated Product",
                Description = "Updated",
                Value = 25
            };

            _productRepoMock.Setup(r => r.Update(product))
                .Returns(Task.CompletedTask);

            await _service.Update(product);

            _productRepoMock.Verify(r => r.Update(product), Times.Once);
            _notifierMock.Verify(n => n.Handle(It.IsAny<Notification>()), Times.Never);
        }

        [Fact]
        public async Task Update_InvalidProduct_ShouldNotCallRepositoryAndNotify()
        {
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = null,
                Value = -5
            };

            await _service.Update(product);

            _productRepoMock.Verify(r => r.Update(It.IsAny<Product>()), Times.Never);
            _notifierMock.Verify(n => n.Handle(It.IsAny<Notification>()), Times.AtLeastOnce);
        }

        [Fact]
        public async Task Delete_ShouldCallRepositoryDelete()
        {
            var id = Guid.NewGuid();

            _productRepoMock.Setup(r => r.Delete(id))
                .Returns(Task.CompletedTask);

            await _service.Delete(id);

            _productRepoMock.Verify(r => r.Delete(id), Times.Once);
        }
    }
}
