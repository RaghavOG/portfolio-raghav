import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission } from '@/models/Contact';
import connectDB from '@/lib/mongodb';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { status } = await request.json();
    const { id } = await params;

    if (!['pending', 'read', 'replied'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedSubmission = await ContactSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSubmission) {
      return NextResponse.json(
        { error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Status updated successfully',
      submission: updatedSubmission
    });

  } catch (error) {
    console.error('Failed to update contact status:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    const submission = await ContactSubmission.findById(id);

    if (!submission) {
      return NextResponse.json(
        { error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);

  } catch (error) {
    console.error('Failed to fetch contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}
