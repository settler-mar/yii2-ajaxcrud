/*!
 * Ajax Crud 
 * =================================
 * Use for johnitvn/yii2-ajaxcrud extension
 * @author John Martin john.itvn@gmail.com
 */
$(document).ready(function () {

  // Create instance of Modal Remote
  // This instance will be the controller of all business logic of modal
  // Backwards compatible lookup of old ajaxCrubModal ID
  if ($('#ajaxCrubModal').length > 0 && $('#ajaxCrudModal').length == 0) {
    modal = new ModalRemote('#ajaxCrubModal');
  } else {
    modal = new ModalRemote('#ajaxCrudModal');
  }

  // Catch click event on all buttons that want to open a modal
  $(document).on('click', '[role="modal-new"]', function (event) {
    event.preventDefault();

    var id = 'new_modal';

    var modal = '<div id="'+id+'" class="fade modal" role="dialog" tabindex="-1">' +
      '<div class="modal-dialog "><div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
      '</div>' +
      '<div class="modal-body"></div>' +
      '<div class="modal-footer"></div>' +
      '</div>' +
      '</div>' +
      '</div>';
    $('body').append(modal);

    modal = new ModalRemote('#'+id);
    modal.open(this, null);
  });

  // Catch click event on all buttons that want to open a modal
  $(document).on('click', '[role="modal-remote"]', function (event) {
    event.preventDefault();

    // Open modal
    modal.open(this, null);
  });

  // Catch click event on all buttons that want to open a modal
  // with bulk action
  $(document).on('click', '[role="modal-remote-bulk"]', function (event) {
    event.preventDefault();

    // Collect all selected ID's
    var selectedIds = [];
    $('input:checkbox[name="selection[]"]').each(function () {
      if (this.checked)
        selectedIds.push($(this).val());
    });

    if (selectedIds.length == 0) {
      // If no selected ID's show warning
      modal.show();
      modal.setTitle('No selection');
      modal.setContent('You must select item(s) to use this action');
      modal.addFooterButton("Close", 'btn btn-default', function (button, event) {
        this.hide();
      });
    } else {
      // Open modal
      modal.open(this, selectedIds);
    }
  });
});